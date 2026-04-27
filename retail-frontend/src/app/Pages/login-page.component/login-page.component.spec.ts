import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
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
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    expect(component.loginForm.invalid).toBe(true);
  });

  it('should validate email format', () => {
    component.loginForm.setValue({
      email: 'invalid-email',
      password: '123456'
    });

    expect(component.getControl('email')?.invalid).toBe(true);
  });

  it('should render input fields in DOM', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(2);
  });

  it('should submit valid form', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456'
    });

    fixture.detectChanges();

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    component.onSubmit();

    expect(component.loginForm.valid).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      'Login Successful:',
      component.loginForm.value
    );
  });
});