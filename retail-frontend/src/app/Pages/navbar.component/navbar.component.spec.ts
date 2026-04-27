import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule // 🔥 THIS FIXES YOUR ERROR
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the navbar', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo text', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo.nativeElement.textContent).toContain('FoodApp');
  });

  it('should render all navigation buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(5);
  });

  it('should have Home button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.textContent).toContain('Home');
  });

  it('should navigate when logo is clicked', () => {
    const spy = vi.spyOn(router, 'navigate');

    const logo = fixture.debugElement.query(By.css('.logo'));
    logo.triggerEventHandler('click');

    expect(spy).toHaveBeenCalledWith(['menu']);
  });
});