import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsToPayContractFormComponent } from './accounts-to-pay-contract-form.component';

describe('AccountsToPayContractFormComponent', () => {
  let component: AccountsToPayContractFormComponent;
  let fixture: ComponentFixture<AccountsToPayContractFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsToPayContractFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsToPayContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

