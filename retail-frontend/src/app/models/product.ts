export interface Product {
    productId: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  sellerId: number;
  sellerName: string;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl: string;
}
