import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveOrdersComponent } from './recieve-orders.component';

describe('RecieveOrdersComponent', () => {
  let component: RecieveOrdersComponent;
  let fixture: ComponentFixture<RecieveOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
