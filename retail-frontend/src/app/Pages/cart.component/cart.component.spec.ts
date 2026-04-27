import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
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

  it('should load cart items', () => {
    expect(component.cartItems.length).toBeGreaterThan(0);
  });

  it('should calculate total amount correctly', () => {
    component.cartItems = [
      { id: 1, name: 'Test', price: 100, quantity: 2 }
    ];
    component.calculateTotal();
    expect(component.totalAmount).toBe(200);
  });

  it('should render cart items in DOM', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.cart-item'));
    expect(items.length).toBeGreaterThan(0);
  });

  it('should navigate to order page on placeOrder', () => {
    component.placeOrder();
    expect(router.navigate).toHaveBeenCalledWith(['/order']);
  });
}); 