export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string; // Assuming it can be an empty string for missing images
  categoryId: number;
  sellerId: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  deletedAt: string | null; // Nullable if deleted
}
