import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupResturantComponent } from './signup-resturant.component';

describe('SignupResturantComponent', () => {
  let component: SignupResturantComponent;
  let fixture: ComponentFixture<SignupResturantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupResturantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
