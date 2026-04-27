import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { ProductService } from './product-service';
import { CartService } from './cart-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  placeOrder(address: string): Order {

    const cartItems = this.cartService.getCart();

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    let totalAmount = 0;

    // 🔥 Update stock
    cartItems.forEach(item => {
      const product = this.productService
        .getProducts()
        .find(p => p.productId === item.productId);

      if (!product || product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productName}`);
      }

      product.stockQuantity -= item.quantity;

      totalAmount += item.price * item.quantity;
    });

    const order: Order = {
      orderId: Date.now(),
      orderDate: new Date().toISOString(),
      totalAmount: totalAmount,
      status: 'Confirmed',
      shippingAddress: address
    };

    this.orders.push(order);

    // 🔥 Clear cart after order
    this.cartService.clearCart();

    return order;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  cancelOrder(orderId: number) {

    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    order.status = 'Cancelled';

    // ⚠️ (Optional advanced)
    // Restore stock if you track order items separately
  }
}
