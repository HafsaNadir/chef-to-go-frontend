import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDiscountComponent } from './menu-discount.component';

describe('MenuDiscountComponent', () => {
  let component: MenuDiscountComponent;
  let fixture: ComponentFixture<MenuDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
