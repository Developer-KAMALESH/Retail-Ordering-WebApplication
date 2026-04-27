import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load menu items', () => {
    expect(component.allItems.length).toBeGreaterThan(0);
  });

  it('should render menu items in DOM', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.menu-card'));
    expect(items.length).toBeGreaterThan(0);
  });

  it('should show no data message when no items match', () => {
    component.menuForm.patchValue({ category: 'NonExisting' });
    component.applyFilters();
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('.no-data'));
    expect(message).toBeTruthy();
  });
});