import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStatusListComponent } from './property-status-list.component';

describe('PropertyStatusListComponent', () => {
  let component: PropertyStatusListComponent;
  let fixture: ComponentFixture<PropertyStatusListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PropertyStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

