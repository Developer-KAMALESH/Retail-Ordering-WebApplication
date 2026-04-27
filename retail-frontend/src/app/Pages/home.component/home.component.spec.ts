import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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

  it('should render buttons in DOM', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should navigate to login when login button clicked', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.navigateToLogin();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register when register button clicked', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.navigateToRegister();
    expect(spy).toHaveBeenCalledWith(['/register']);
  });
});