import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  constructor(private productService: ProductService) {}

  // 🔹 ADD TO CART
  addToCart(productId: number, quantity: number = 1) {

    const product = this.productService
      .getProducts()
      .find(p => p.productId === productId);

    if (!product) return;

    const existingItem = this.cart.find(c => c.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        cartItemId: Date.now(),
        productId: product.productId,
        productName: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    }
  }

  // 🔹 GET CART
  getCart(): CartItem[] {
    return this.cart;
  }

  // 🔹 UPDATE QUANTITY
  updateQuantity(cartItemId: number, quantity: number) {
    const item = this.cart.find(c => c.cartItemId === cartItemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  // 🔹 REMOVE ITEM
  removeItem(cartItemId: number) {
    this.cart = this.cart.filter(c => c.cartItemId !== cartItemId);
  }

  // 🔹 CLEAR CART
  clearCart() {
    this.cart = [];
  }

  // 🔹 TOTAL PRICE (bonus 🔥)
  getTotalAmount(): number {
    return this.cart.reduce((total, item) =>
      total + (item.price * item.quantity), 0);
  }
}
