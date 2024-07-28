export interface CartItem {
    _id: string;
    name: string;
    images: string[];
    price: number;
    discount_price?: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string | number | null;
    countInStock: number;
    colors?: string[];
    sizes?: (string | number | null)[];
}
