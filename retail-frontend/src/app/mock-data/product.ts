import { Product } from '../models/product';

export const PRODUCTS: Product[] = [
  {
    productId: 1,
    name: 'Margherita Pizza',
    description: 'Classic cheese pizza',
    price: 250,
    categoryId: 1,
    categoryName: 'Pizza',
    sellerId: 101,
    sellerName: 'Pizza Hub',
    stockQuantity: 10,
    isAvailable: true,
    imageUrl: 'https://www.youngurbanproject.com/wp-content/uploads/2025/03/Product-Marketing.jpg'
  },
  {
    productId: 2,
    name: 'Veg Burger',
    description: 'Crispy veg burger',
    price: 120,
    categoryId: 2,
    categoryName: 'Burger',
    sellerId: 102,
    sellerName: 'Burger Point',
    stockQuantity: 5,
    isAvailable: true,
    imageUrl: 'https://www.youngurbanproject.com/wp-content/uploads/2025/03/Product-Marketing.jpg'
  }
];