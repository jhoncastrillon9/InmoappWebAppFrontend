import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToReceivableContractListComponent } from './accounts-to-receivable-contract-list.component';

describe('AccountsToReceivableContractListComponent', () => {
  let component: AccountsToReceivableContractListComponent;
  let fixture: ComponentFixture<AccountsToReceivableContractListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToReceivableContractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToReceivableContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

