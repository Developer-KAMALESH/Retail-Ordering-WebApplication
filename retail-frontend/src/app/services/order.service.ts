import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

const BASE = 'http://localhost:5005/api/orders';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
  constructor(private http: HttpClient) {}

  placeOrder(userId: number, shippingAddress: string): Observable<Order> {
    return this.http.post<Order>(`${BASE}?userId=${userId}`, { shippingAddress });
  }

  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${BASE}?userId=${userId}`);
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${BASE}/${orderId}/cancel`, {});
  }
}
