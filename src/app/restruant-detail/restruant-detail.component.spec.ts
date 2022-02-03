import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestruantDetailComponent } from './restruant-detail.component';

describe('RestruantDetailComponent', () => {
  let component: RestruantDetailComponent;
  let fixture: ComponentFixture<RestruantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestruantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestruantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
