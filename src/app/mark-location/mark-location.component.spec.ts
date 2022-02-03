import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkLocationComponent } from './mark-location.component';

describe('MarkLocationComponent', () => {
  let component: MarkLocationComponent;
  let fixture: ComponentFixture<MarkLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
