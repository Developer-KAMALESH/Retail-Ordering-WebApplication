import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotal();
  }

  loadCartItems(): void {
    // Mock data (replace with service later)
    this.cartItems = [
      { id: 1, name: 'Margherita Pizza', price: 199, quantity: 2 },
      { id: 2, name: 'Coke', price: 60, quantity: 1 },
      { id: 3, name: 'Garlic Bread', price: 120, quantity: 1 }
    ];
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.calculateTotal();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.calculateTotal();
  }

  placeOrder(): void {
    this.router.navigate(['/order']);
  }
}