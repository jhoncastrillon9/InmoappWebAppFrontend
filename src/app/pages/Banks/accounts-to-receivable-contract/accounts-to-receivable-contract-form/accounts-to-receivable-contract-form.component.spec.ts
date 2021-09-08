import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToReceivableContractFormComponent } from './accounts-to-receivable-contract-form.component';

describe('AccountsToReceivableContractFormComponent', () => {
  let component: AccountsToReceivableContractFormComponent;
  let fixture: ComponentFixture<AccountsToReceivableContractFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToReceivableContractFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToReceivableContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

