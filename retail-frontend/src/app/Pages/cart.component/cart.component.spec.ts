import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { Router } from '@angular/router';
import { CartService } from '../../mock-data/cart-service';
import { CartItem } from '../../models/cart-item';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;

  const mockCartItems: CartItem[] = [
    {
      cartItemId: 1,
      productId: 101,
      productName: 'Test Pizza',
      imageUrl: '',
      price: 100,
      quantity: 2
    }
  ];

  const mockCartService = {
    getCart: vi.fn().mockReturnValue(mockCartItems),
    getTotalAmount: vi.fn().mockReturnValue(200),
    updateQuantity: vi.fn(),
    removeItem: vi.fn(),
    clearCart: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items from service', () => {
    expect(component.cartItems.length).toBeGreaterThan(0);
    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should calculate total amount correctly', () => {
    component.calculateTotal();
    expect(component.totalAmount).toBe(200);
    expect(mockCartService.getTotalAmount).toHaveBeenCalled();
  });

 
});