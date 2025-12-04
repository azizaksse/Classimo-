import { getSupabaseAdmin } from "@/lib/supabaseAdminClient";
import { revalidatePath } from "next/cache";

type Category = {
    id: string;
    name: string;
    created_at: string;
};

async function getCategories() {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) return [];

    const { data } = await supabaseAdmin
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

    return (data as Category[]) || [];
}

async function createCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name || !name.trim()) return;

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) throw new Error("Supabase Admin not initialized");

    await supabaseAdmin.from("categories").insert({ name: name.trim() });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
}

async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) throw new Error("Supabase Admin not initialized");

    await supabaseAdmin.from("categories").delete().eq("id", id);
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold">Categories Admin</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Manage product categories (sections).
                    </p>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
                    <h2 className="text-lg font-semibold">Add Category</h2>
                    <form action={createCategory} className="mt-4 flex gap-4">
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Category Name (e.g. T-Shirt)"
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                        >
                            Add
                        </button>
                    </form>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                        <h2 className="text-lg font-semibold">Existing Categories</h2>
                    </div>
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                            <thead className="bg-slate-100/80 text-left text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {categories.map((category) => (
                                    <tr key={category.id} className="bg-white dark:bg-slate-900">
                                        <td className="px-4 py-3 font-medium">{category.name}</td>
                                        <td className="px-4 py-3 text-right">
                                            <form action={deleteCategory}>
                                                <input type="hidden" name="id" value={category.id} />
                                                <button
                                                    type="submit"
                                                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
