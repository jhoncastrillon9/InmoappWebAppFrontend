import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsStatusFormComponent } from './accounts-status-form.component';

describe('AccountsStatusFormComponent', () => {
  let component: AccountsStatusFormComponent;
  let fixture: ComponentFixture<AccountsStatusFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

