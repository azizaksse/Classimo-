export type FilterType = 'text' | 'number' | 'select';

export interface FilterSchema {
    key: string;
    label: string;
    type: FilterType;
    options?: string[]; // Only for 'select' type
}

export interface Category {
    id: number; // Changed to number for BigInt
    name: string;
    slug: string;
    filter_schema: FilterSchema[]; // Renamed from allowed_filters
}

export interface Product {
    id: number; // Changed to number for BigInt
    title: string;
    price: number;
    stock: number;
    category_id: number;
    images: string[];
    specs: Record<string, string | number>; // Renamed from specifications
    created_at: string;
}
