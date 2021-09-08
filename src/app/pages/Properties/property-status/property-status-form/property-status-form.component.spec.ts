import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStatusFormComponent } from './property-status-form.component';

describe('PropertyStatusFormComponent', () => {
  let component: PropertyStatusFormComponent;
  let fixture: ComponentFixture<PropertyStatusFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PropertyStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

