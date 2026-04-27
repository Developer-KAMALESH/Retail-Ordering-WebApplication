import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    component.registerForm.setValue({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    expect(component.registerForm.invalid).toBe(true);
  });

  it('should validate password match', () => {
    component.registerForm.setValue({
      fullName: 'Test User',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '654321'
    });

    expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();
  });

  it('should render form inputs in DOM', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(4);
  });
});