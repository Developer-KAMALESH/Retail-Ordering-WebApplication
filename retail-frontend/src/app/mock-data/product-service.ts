import { Injectable } from '@angular/core';
import { PRODUCTS } from './product';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Product[] {
    return PRODUCTS;
  }

  addProduct(product: Product) {
    PRODUCTS.push(product);
  }

  updateProduct(updated: Product) {
    const index = PRODUCTS.findIndex(p => p.productId === updated.productId);
    if (index !== -1) PRODUCTS[index] = updated;
  }

  deleteProduct(id: number) {
    const product = PRODUCTS.find(p => p.productId === id);
    if (product) product.isAvailable = false;
  }
  getProductsByCategory(categoryId?: number): Product[] {

  if (!categoryId) {
    return PRODUCTS.filter(p => p.isAvailable && p.stockQuantity > 0);
  }

  return PRODUCTS.filter(p =>
    p.categoryId === categoryId &&
    p.isAvailable &&
    p.stockQuantity > 0
  );
}
}
