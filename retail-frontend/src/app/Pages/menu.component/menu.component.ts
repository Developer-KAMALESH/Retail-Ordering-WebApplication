import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../mock-data/cart-service';
import { ProductService } from '../../mock-data/product-service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
filteredProducts: any;
selectedCategory: any;
categories: any;
filterByCategory(arg0: any) {
throw new Error('Method not implemented.');
}
resetFilter() {
throw new Error('Method not implemented.');
}

  menuForm!: FormGroup;

  allItems: Product[] = [];
  filteredItems: Product[] = [];

  showPopup = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  initializeForm(): void {
    this.menuForm = this.fb.group({
      category: [''],
      brand: ['']
    });

    this.menuForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadProducts(): void {
    this.allItems = this.productService.getProducts(); // 🔥 FROM SERVICE
    this.filteredItems = [...this.allItems];
  }

  applyFilters(): void {
    const { category, brand } = this.menuForm.value;

    this.filteredItems = this.allItems.filter(item =>
      (!category || item.categoryId === category) &&
      (!brand || item.brand === brand)
    );
  }

  addToCart(item: Product): void {
    this.cartService.addToCart(item.productId, 1);

    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 2000);
  }
}