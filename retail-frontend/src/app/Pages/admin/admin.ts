import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  private productApi = inject(ProductApiService);
  private authService = inject(AuthService);

  sellerId = signal(0);
  ready = signal(false);
  products = signal<Product[]>([]);
  isEditMode = signal(false);
  form = signal<Product>(this.emptyProduct());

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.sellerId.set(this.authService.userId);
      this.ready.set(true);
      this.loadProducts();
    } else {
      this.authService.login('seller@store.com', 'seller123').subscribe({
        next: (user) => {
          this.sellerId.set(user.userId);
          this.ready.set(true);
          this.loadProducts();
        },
        error: () => alert('Could not authenticate seller. Please login first.')
      });
    }
  }

  loadProducts(): void {
    this.productApi.getSellerProducts(this.sellerId()).subscribe(p => this.products.set(p));
  }

  emptyProduct(): Product {
    return {
      productId: 0, name: '', description: '', price: 0,
      categoryId: 1, categoryName: '', sellerId: this.sellerId?.() ?? 0,
      sellerName: 'My Store', stockQuantity: 0, isAvailable: true, imageUrl: ''
    };
  }

  submitForm(): void {
    if (!this.sellerId()) { alert('Still authenticating, please try again.'); return; }
    const f = this.form();
    if (this.isEditMode()) {
      this.productApi.updateProduct(f.productId, this.sellerId(), f)
        .subscribe({ next: () => { this.resetForm(); this.loadProducts(); }, error: (e) => alert(e.error) });
    } else {
      this.productApi.addProduct(this.sellerId(), f)
        .subscribe({ next: () => { this.resetForm(); this.loadProducts(); }, error: (e) => alert(e.error) });
    }
  }

  editProduct(product: Product): void {
    this.form.set({ ...product });
    this.isEditMode.set(true);
  }

  deleteProduct(id: number): void {
    this.productApi.deleteProduct(id, this.sellerId())
      .subscribe(() => this.loadProducts());
  }

  resetForm(): void {
    this.form.set(this.emptyProduct());
    this.isEditMode.set(false);
  }

  updateField<K extends keyof Product>(key: K, value: Product[K]): void {
    this.form.update(f => ({ ...f, [key]: value }));
  }
}
