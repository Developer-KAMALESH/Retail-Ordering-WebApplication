import { CartService } from './../../mock-data/cart-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../mock-data/product-service';

interface MenuItem {
  id: number;
  name: string;
  category: 'Pizza' | 'Drinks' | 'Breads';
  brand: string;
  price: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
// export class MenuComponent implements OnInit {
//   menuForm!: FormGroup;
//   allItems: MenuItem[] = [];
//   filteredItems: MenuItem[] = [];

//   categories: string[] = ['Pizza', 'Drinks', 'Breads'];
//   brands: string[] = ['Dominos', 'PizzaHut', 'Local'];

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadMenuItems();
//     this.applyFilters();

//     this.menuForm.valueChanges.subscribe(() => {
//       this.applyFilters();
//     });
//   }

//   initializeForm(): void {
//     this.menuForm = this.fb.group({
//       category: [''],
//       brand: ['']
//     });
//   }

//   loadMenuItems(): void {
//     this.allItems = [
//       { id: 1, name: 'Margherita', category: 'Pizza', brand: 'Dominos', price: 199 },
//       { id: 2, name: 'Pepsi', category: 'Drinks', brand: 'Local', price: 50 },
//       { id: 3, name: 'Garlic Bread', category: 'Breads', brand: 'PizzaHut', price: 120 },
//       { id: 4, name: 'Veg Loaded Pizza', category: 'Pizza', brand: 'PizzaHut', price: 299 },
//       { id: 5, name: 'Coke', category: 'Drinks', brand: 'Dominos', price: 60 }
//     ];
//   }

//   applyFilters(): void {
//     const { category, brand } = this.menuForm.value;

//     this.filteredItems = this.allItems.filter(item => {
//       return (
//         (!category || item.category === category) &&
//         (!brand || item.brand === brand)
//       );
//     });
//   }

//   trackById(index: number, item: MenuItem): number {
//     return item.id;
//   }
// }
export class MenuComponent implements OnInit {
  CartService=inject(CartService);

  categories = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Burger' },
  { id: 3, name: 'Beverages' }
];

  products: Product[] = [];
  filteredProducts: Product[] = [];

  selectedCategory: number | null = null;

  constructor(private menuService: ProductService) {}

  ngOnInit(): void {
    this.products = this.menuService.getProducts();
    this.filteredProducts = this.products;
  }

  filterByCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.filteredProducts = this.menuService.getProductsByCategory(categoryId);
  }

  resetFilter() {
    this.filteredProducts = this.products;
    this.selectedCategory = null;
  }
  addToCart(productId: number) {
  this.CartService.addToCart(productId, 1);
}
}