import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const BASE = 'http://localhost:5005/api/products';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  constructor(private http: HttpClient) {}

  getProducts(categoryId?: number): Observable<Product[]> {
    const params = categoryId && categoryId > 0 ? `?categoryId=${categoryId}` : '';
    return this.http.get<Product[]>(`${BASE}${params}`);
  }

  getSellerProducts(sellerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE}/seller?sellerId=${sellerId}`);
  }

  addProduct(sellerId: number, dto: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${BASE}?sellerId=${sellerId}`, dto);
  }

  updateProduct(id: number, sellerId: number, dto: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${BASE}/${id}?sellerId=${sellerId}`, dto);
  }

  deleteProduct(id: number, sellerId: number): Observable<any> {
    return this.http.delete(`${BASE}/${id}?sellerId=${sellerId}`);
  }
}
