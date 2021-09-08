import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCategoryFormComponent } from './property-category-form.component';

describe('PropertyCategoryFormComponent', () => {
  let component: PropertyCategoryFormComponent;
  let fixture: ComponentFixture<PropertyCategoryFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

