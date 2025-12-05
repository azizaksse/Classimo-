'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { Category, FilterSchema } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState(''); // Comma separated URLs for simplicity
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [specs, setSpecs] = useState<Record<string, string | number | boolean>>({});

    const supabase = getSupabaseClient();

    useEffect(() => {
        async function fetchCategories() {
            if (!supabase) return;
            const { data, error } = await supabase.from('categories').select('*');
            if (data) setCategories(data as Category[]);
            if (error) console.error('Error fetching categories:', error);
        }
        fetchCategories();
    }, [supabase]);

    const handleCategoryChange = (categoryId: string) => {
        const category = categories.find((c) => c.id === Number(categoryId));
        setSelectedCategory(category || null);
        setSpecs({}); // Reset specs when category changes
    };

    const handleSpecChange = (key: string, value: string | number | boolean) => {
        setSpecs((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = async (file: File) => {
        if (!supabase) return;
        setUploadingImage(true);
        const filePath = `products/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
            setUploadingImage(false);
            return;
        }

        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        setUploadedImageUrl(data.publicUrl);
        setUploadingImage(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !selectedCategory) return;

        setLoading(true);

        const imageList = images
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        if (imageFile && !uploadedImageUrl) {
            await handleImageUpload(imageFile);
        }

        if (uploadedImageUrl) {
            imageList.unshift(uploadedImageUrl);
        }

        const { error } = await supabase.from('products').insert({
            title,
            price: parseFloat(price),
            stock: parseInt(stock),
            category_id: selectedCategory.id,
            images: imageList,
            specs: specs,
        });

        setLoading(false);
        if (error) {
            alert('Error creating product: ' + error.message);
        } else {
            alert('Product created successfully!');
            // Reset form
            setTitle('');
            setPrice('');
            setStock('');
            setImages('');
            setUploadedImageUrl(null);
            setImageFile(null);
            setSpecs({});
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Base Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Title</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="e.g. Navy Blue Suit"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <Input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Images (Comma separated URLs)</label>
                            <Input
                                value={images}
                                onChange={(e) => setImages(e.target.value)}
                                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Upload Image</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setImageFile(file);
                                    void handleImageUpload(file);
                                }}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                We&apos;ll store the public URL in the images array automatically.
                            </p>
                            {uploadingImage ? (
                                <p className="text-xs text-blue-600 mt-1">Uploading...</p>
                            ) : null}
                            {uploadedImageUrl ? (
                                <p className="text-xs text-green-600 mt-1">
                                    Ready: {uploadedImageUrl}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                value={selectedCategory?.id || ''}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Dynamic Fields */}
                    {selectedCategory && (
                        <div className="border-t pt-4 mt-4">
                            <h3 className="text-lg font-semibold mb-4">
                                {selectedCategory.name} Specifications
                            </h3>
                            <div className="grid gap-4">
                                {/* 
                  Here is the logic:
                  Look at the filter_schema of the selected category.
                  Dynamically render inputs based on that schema.
                */}
                                {selectedCategory.filter_schema?.map((filter: FilterSchema) => (
                                    <div key={filter.key}>
                                        <label className="block text-sm font-medium mb-1">
                                            {filter.label}
                                        </label>

                                        {filter.type === 'select' && filter.options ? (
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                onChange={(e) => handleSpecChange(filter.key, e.target.value)}
                                                value={
                                                    specs[filter.key] === undefined
                                                        ? ''
                                                        : String(specs[filter.key])
                                                }
                                            >
                                                <option value="">Select {filter.label}</option>
                                                {filter.options.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <Input
                                                type={filter.type === 'number' ? 'number' : 'text'}
                                                onChange={(e) => handleSpecChange(filter.key, e.target.value)}
                                                value={
                                                    specs[filter.key] === undefined
                                                        ? ''
                                                        : String(specs[filter.key])
                                                }
                                                placeholder={`Enter ${filter.label}`}
                                            />
                                        )}
                                    </div>
                                ))}

                                {(!selectedCategory.filter_schema || selectedCategory.filter_schema.length === 0) && (
                                    <p className="text-sm text-muted-foreground">No specific filters defined for this category.</p>
                                )}
                            </div>
                        </div>
                    )}

                    <Button type="submit" disabled={loading || uploadingImage} className="w-full">
                        {loading ? 'Saving...' : uploadingImage ? 'Uploading image...' : 'Create Product'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
