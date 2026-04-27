import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartApiService } from '../../services/cart.service';
import { OrderApiService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = signal<CartItem[]>([]);
  shippingAddress = '';
  orderPlaced = signal(false);

  totalAmount = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  constructor(
    private cartApi: CartApiService,
    private orderApi: OrderApiService,
    private authService: AuthService
  ) {}

  get userId(): number { return this.authService.userId; }
  get isLoggedIn(): boolean { return this.authService.isLoggedIn; }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.loadCart();
    }
  }

  loadCart(): void {
    this.cartApi.getCart(this.userId).subscribe(items => this.cartItems.set(items));
  }

  increaseQuantity(item: CartItem): void {
    this.cartApi.updateQuantity(this.userId, item.cartItemId, item.quantity + 1)
      .subscribe({ next: () => this.loadCart(), error: () => this.loadCart() });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartApi.updateQuantity(this.userId, item.cartItemId, item.quantity - 1)
        .subscribe({ next: () => this.loadCart(), error: () => this.loadCart() });
    } else {
      this.removeItem(item.cartItemId);
    }
  }

  removeItem(cartItemId: number): void {
    this.cartApi.removeItem(this.userId, cartItemId)
      .subscribe({ next: () => this.loadCart(), error: () => this.loadCart() });
  }

  clearCart(): void {
    this.cartApi.clearCart(this.userId)
      .subscribe({ next: () => this.cartItems.set([]), error: () => this.loadCart() });
  }

  placeOrder(): void {
    if (this.cartItems().length === 0) return;
    const address = this.shippingAddress.trim() || 'Default Address';

    this.orderApi.placeOrder(this.userId, address).subscribe({
      next: () => {
        this.orderPlaced.set(true);
        this.cartItems.set([]);
        this.shippingAddress = '';
        setTimeout(() => this.orderPlaced.set(false), 3000);
      },
      // error: (err) => alert(err.error || 'Failed to place order')
    });
  }
}
