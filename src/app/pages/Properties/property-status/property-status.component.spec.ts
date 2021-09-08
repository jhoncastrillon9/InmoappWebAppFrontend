import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStatusComponent } from './property-status.component';

describe('PropertyStatusComponent', () => {
  let component: PropertyStatusComponent;
  let fixture: ComponentFixture<PropertyStatusComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PropertyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

