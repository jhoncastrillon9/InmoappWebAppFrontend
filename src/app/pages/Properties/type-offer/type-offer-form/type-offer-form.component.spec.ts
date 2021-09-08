import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfferFormComponent } from './type-offer-form.component';

describe('TypeOfferFormComponent', () => {
  let component: TypeOfferFormComponent;
  let fixture: ComponentFixture<TypeOfferFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

