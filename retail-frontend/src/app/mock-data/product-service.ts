import { Injectable } from '@angular/core';
import { PRODUCTS } from './product';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // 🔹 GET ALL (Customer view)
  getProducts(): Product[] {
    return PRODUCTS.filter(p => p.isAvailable && p.stockQuantity > 0);
  }

  // 🔹 GET BY CATEGORY
  getProductsByCategory(categoryId?: number): Product[] {

    if (!categoryId || categoryId === 0) {
      return this.getProducts();
    }

    return PRODUCTS.filter(p =>
      p.categoryId === categoryId &&
      p.isAvailable &&
      p.stockQuantity > 0
    );
  }

  // 🔹 GET PRODUCT BY ID
  getProductById(productId: number): Product | undefined {
    return PRODUCTS.find(p => p.productId === productId);
  }

  // 🔹 SELLER: GET OWN PRODUCTS
  getSellerProducts(sellerId: number): Product[] {
    return PRODUCTS.filter(p => p.sellerId === sellerId);
  }

  // 🔹 ADD PRODUCT
  addProduct(product: Product) {
    product.productId = Date.now(); // mock id
    product.isAvailable = true;

    PRODUCTS.push(product);
  }

  // 🔹 UPDATE PRODUCT
  updateProduct(updated: Product) {
    const index = PRODUCTS.findIndex(p => p.productId === updated.productId);

    if (index !== -1) {
      PRODUCTS[index] = updated;
    }
  }

  // 🔹 DELETE PRODUCT (soft delete)
  deleteProduct(id: number) {
    const product = PRODUCTS.find(p => p.productId === id);

    if (product) {
      product.isAvailable = false;
    }
  }

  // 🔹 INVENTORY: REDUCE STOCK
  reduceStock(productId: number, quantity: number) {
    const product = this.getProductById(productId);

    if (product && product.stockQuantity >= quantity) {
      product.stockQuantity -= quantity;
    }
  }

  // 🔹 INVENTORY: RESTORE STOCK (for cancel)
  increaseStock(productId: number, quantity: number) {
    const product = this.getProductById(productId);

    if (product) {
      product.stockQuantity += quantity;
    }
  }
}
