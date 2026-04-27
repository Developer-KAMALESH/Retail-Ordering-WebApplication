import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductApiService } from '../../services/product.service';
import { CartApiService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  private productApi = inject(ProductApiService);
  private cartApi = inject(CartApiService);
  private authService = inject(AuthService);

  categories = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Burger' },
    { id: 3, name: 'Beverages' }
  ];

  // signals
  allProducts = signal<Product[]>([]);
  selectedCategory = signal<number>(0);

  // derived: filter client-side from loaded products
  filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 0) return this.allProducts();
    return this.allProducts().filter(p => p.categoryId === cat);
  });

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.productApi.getProducts().subscribe(p => this.allProducts.set(p));
  }

  filterByCategory(categoryId: number): void {
    this.selectedCategory.set(categoryId);
  }

  addToCart(productId: number): void {
    const userId = this.authService.userId;
    if (!userId) { alert('Please login to add items to cart'); return; }
    this.cartApi.addToCart(userId, productId, 1).subscribe();
  }
}
