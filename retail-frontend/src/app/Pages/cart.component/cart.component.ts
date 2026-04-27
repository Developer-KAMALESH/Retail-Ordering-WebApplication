import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../mock-data/cart-service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalAmount = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartService.getTotalAmount();
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.cartItemId, item.quantity + 1);
    this.loadCart();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.cartItemId, item.quantity - 1);
      this.loadCart();
    }
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeItem(cartItemId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  placeOrder(): void {
    this.router.navigate(['/order']);
  }
}