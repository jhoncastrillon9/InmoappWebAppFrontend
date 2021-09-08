import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToPayContractComponent } from './accounts-to-pay-contract.component';

describe('AccountsToPayContractComponent', () => {
  let component: AccountsToPayContractComponent;
  let fixture: ComponentFixture<AccountsToPayContractComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToPayContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToPayContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

