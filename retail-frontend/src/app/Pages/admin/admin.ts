import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../mock-data/product-service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  private productService = inject(ProductService);

  currentSellerId = 101; // 🔥 mock seller

  products: Product[] = [];

  isEditMode = false;

  form: Product = this.getEmptyProduct();

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getSellerProducts(this.currentSellerId);
  }

  getEmptyProduct(): Product {
    return {
      productId: 0,
      name: '',
      description: '',
      price: 0,
      categoryId: 0,
      categoryName: '',
      sellerId: this.currentSellerId,
      sellerName: 'My Store',
      stockQuantity: 0,
      isAvailable: true,
      imageUrl: ''
    };
  }

  submitForm() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.form);
    } else {
      this.productService.addProduct({
        ...this.form,
        sellerId: this.currentSellerId
      });
    }

    this.resetForm();
    this.loadProducts();
  }

  editProduct(product: Product) {
    this.form = { ...product };
    this.isEditMode = true;
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  resetForm() {
    this.form = this.getEmptyProduct();
    this.isEditMode = false;
  }
}

