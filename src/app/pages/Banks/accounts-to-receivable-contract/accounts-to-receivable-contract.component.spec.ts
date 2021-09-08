import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToReceivableContractComponent } from './accounts-to-receivable-contract.component';

describe('AccountsToReceivableContractComponent', () => {
  let component: AccountsToReceivableContractComponent;
  let fixture: ComponentFixture<AccountsToReceivableContractComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToReceivableContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToReceivableContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

