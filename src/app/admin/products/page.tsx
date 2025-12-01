import { getSupabaseAdmin } from "@/lib/supabaseAdminClient";
import { revalidatePath } from "next/cache";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
  category?: string | null;
};



const isMissingCategoryColumn = (error?: { code?: string; message?: string } | null) =>
  !!error &&
  (error.code === "42703" ||
    error.message?.toLowerCase().includes("category") ||
    error.message?.toLowerCase().includes('column "category"'));

async function getCategories() {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) return [];

  const { data } = await supabaseAdmin
    .from("categories")
    .select("name")
    .order("name", { ascending: true });

  return (data?.map(c => c.name) as string[]) || [];
}

async function getProducts(): Promise<{
  data: Product[];
  categories: string[];
  error?: string;
  warning?: string;
}> {
  const supabaseAdmin = getSupabaseAdmin();
  const categories = await getCategories();

  if (!supabaseAdmin) {
    return {
      data: [],
      categories: [],
      warning: "Supabase admin environment variables are not set. Add products after configuring env vars.",
    };
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, description, price, image_url, created_at, category")
    .order("created_at", { ascending: false });

  if (isMissingCategoryColumn(error)) {
    const { data: fallbackData, error: fallbackError } = await supabaseAdmin
      .from("products")
      .select("id, name, description, price, image_url, created_at")
      .order("created_at", { ascending: false });

    if (fallbackError) {
      return { data: [], categories, error: fallbackError.message };
    }

    return {
      data:
        (fallbackData as Product[] | null)?.map((item) => ({
          ...item,
          category: null,
        })) ?? [],
      categories,
      warning:
        "Products loaded without categories because the 'category' column is missing in Supabase. Add it to enable category selection.",
    };
  }

  if (error) {
    return { data: [], categories, error: error.message };
  }

  return { data: (data as Product[]) ?? [], categories };
}

export async function createProduct(formData: FormData) {
  "use server";

  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const priceValue = formData.get("price");
  const file = formData.get("image") as File | null;
  const rawCategory = (formData.get("category") as string) ?? "";
  const category = rawCategory.trim() || null;

  const price = Number(priceValue);

  if (!name.trim() || Number.isNaN(price)) {
    throw new Error("Name and price are required");
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Missing Supabase environment variables for admin client");
  }

  let imageUrl: string | null = null;

  if (file && typeof file !== "string" && file.size > 0) {
    const filePath = `products/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("product-images").getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const insertPayload = {
    name,
    description,
    price,
    image_url: imageUrl,
    ...(category ? { category } : {}),
  };

  const { error: insertError } = await supabaseAdmin.from("products").insert(insertPayload);

  if (isMissingCategoryColumn(insertError)) {
    const { error: fallbackInsertError } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        description,
        price,
        image_url: imageUrl,
      });

    if (fallbackInsertError) {
      throw fallbackInsertError;
    }
  } else if (insertError) {
    throw insertError;
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteProduct(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Missing product id");
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Missing Supabase environment variables for admin client");
  }

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/admin/products");
}

export async function updateProduct(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const priceValue = formData.get("price");
  const file = formData.get("image") as File | null;
  const rawCategory = (formData.get("category") as string) ?? "";
  const category = rawCategory.trim() || null;

  const price = Number(priceValue);

  if (!id || !name.trim() || Number.isNaN(price)) {
    throw new Error("Missing required fields");
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Missing Supabase environment variables for admin client");
  }

  let updates: Partial<Product> & { image_url?: string | null } = {
    name,
    description,
    price,
    ...(category ? { category } : {}),
  };

  if (file && typeof file !== "string" && file.size > 0) {
    const filePath = `products/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("product-images").getPublicUrl(filePath);

    updates = { ...updates, image_url: publicUrl };
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updates)
    .eq("id", id);

  if (isMissingCategoryColumn(error)) {
    const { category: _omit, ...fallbackUpdates } = updates;
    const { error: fallbackError } = await supabaseAdmin
      .from("products")
      .update(fallbackUpdates)
      .eq("id", id);

    if (fallbackError) {
      throw fallbackError;
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return;
  }

  if (error) {
    throw error;
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export default async function ProductsPage() {
  const { data: products, categories, error, warning } = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Products Admin</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage products, prices, images, and quick edits with server actions.
          </p>
        </header>

        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/40 dark:text-red-200">
            Failed to load products: {error}
          </div>
        ) : null}
        {!error && warning ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-900/30 dark:text-amber-50">
            {warning}
          </div>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-lg font-semibold">Create Product</h2>
          <form action={createProduct} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                placeholder="Product name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                name="category"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
              >
                {categories.length > 0 ? (
                  categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option value="">No categories found</option>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                placeholder="0.00"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                placeholder="Short product description"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Image
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200 dark:text-slate-200 dark:file:bg-slate-800 dark:file:text-slate-100 dark:hover:file:bg-slate-700"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Optional. Leave empty to skip image.
              </p>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
              >
                Add Product
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 className="text-lg font-semibold">Products</h2>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-100/80 text-left text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950/40"}
                  >
                    <td className="px-4 py-3">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200/80 dark:ring-slate-800"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {product.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {product.category || "أخرى"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 space-y-2">
                      <form action={deleteProduct} className="inline">
                        <input type="hidden" name="id" value={product.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                        >
                          Delete
                        </button>
                      </form>

                      <details className="group rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm shadow-sm open:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:open:bg-slate-900">
                        <summary className="flex cursor-pointer items-center justify-between text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                          Edit
                          <span className="text-xs text-slate-500 group-open:hidden dark:text-slate-400">
                            show
                          </span>
                          <span className="text-xs text-slate-500 hidden group-open:inline dark:text-slate-400">
                            hide
                          </span>
                        </summary>
                        <form action={updateProduct} className="mt-3 space-y-3">
                          <input type="hidden" name="id" value={product.id} />
                          <div className="space-y-1">
                            <label className="text-xs text-slate-600 dark:text-slate-300">
                              Name
                            </label>
                            <input
                              name="name"
                              defaultValue={product.name}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-slate-600 dark:text-slate-300">
                              Description
                            </label>
                            <textarea
                              name="description"
                              defaultValue={product.description ?? ""}
                              rows={2}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                            />
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-600 dark:text-slate-300">
                                Price
                              </label>
                              <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={product.price}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-slate-600 dark:text-slate-300">
                                Category
                              </label>
                              <select
                                name="category"
                                defaultValue={product.category ?? ""}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                              >
                                {categories.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-slate-600 dark:text-slate-300">
                                Replace image
                              </label>
                              <input
                                name="image"
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200 dark:text-slate-200 dark:file:bg-slate-800 dark:file:text-slate-100 dark:hover:file:bg-slate-700"
                              />
                            </div>
                          </div>
                          <div className="pt-1">
                            <button
                              type="submit"
                              className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </details>
                    </td>
                  </tr>
                ))}
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      No products yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
