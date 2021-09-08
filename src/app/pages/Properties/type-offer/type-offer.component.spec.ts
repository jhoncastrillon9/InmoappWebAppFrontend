import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfferComponent } from './type-offer.component';

describe('TypeOfferComponent', () => {
  let component: TypeOfferComponent;
  let fixture: ComponentFixture<TypeOfferComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

