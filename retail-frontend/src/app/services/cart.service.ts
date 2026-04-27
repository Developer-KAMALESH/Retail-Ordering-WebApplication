import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

const BASE = 'http://localhost:5005/api/cart';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${BASE}?userId=${userId}`);
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${BASE}/add?userId=${userId}`, { productId, quantity }, { responseType: 'text' });
  }

  updateQuantity(userId: number, cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${BASE}/update?userId=${userId}`, { cartItemId, quantity }, { responseType: 'text' });
  }

  removeItem(userId: number, cartItemId: number): Observable<any> {
    return this.http.delete(`${BASE}/remove/${cartItemId}?userId=${userId}`, { responseType: 'text' });
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${BASE}/clear?userId=${userId}`, { responseType: 'text' });
  }
}
