import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsStatusComponent } from './accounts-status.component';

describe('AccountsStatusComponent', () => {
  let component: AccountsStatusComponent;
  let fixture: ComponentFixture<AccountsStatusComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

