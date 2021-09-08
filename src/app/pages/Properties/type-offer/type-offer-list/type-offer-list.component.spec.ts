import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfferListComponent } from './type-offer-list.component';

describe('TypeOfferListComponent', () => {
  let component: TypeOfferListComponent;
  let fixture: ComponentFixture<TypeOfferListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

