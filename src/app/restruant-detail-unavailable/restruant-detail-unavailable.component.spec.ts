import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestruantDetailUnavailableComponent } from './restruant-detail-unavailable.component';

describe('RestruantDetailUnavailableComponent', () => {
  let component: RestruantDetailUnavailableComponent;
  let fixture: ComponentFixture<RestruantDetailUnavailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestruantDetailUnavailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestruantDetailUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
