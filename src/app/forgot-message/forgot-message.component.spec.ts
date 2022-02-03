import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMessageComponent } from './forgot-message.component';

describe('ForgotMessageComponent', () => {
  let component: ForgotMessageComponent;
  let fixture: ComponentFixture<ForgotMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
