import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToPayContractListComponent } from './accounts-to-pay-contract-list.component';

describe('AccountsToPayContractListComponent', () => {
  let component: AccountsToPayContractListComponent;
  let fixture: ComponentFixture<AccountsToPayContractListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToPayContractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToPayContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

