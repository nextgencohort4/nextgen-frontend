export interface Review {
    _id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    v: number;
}
