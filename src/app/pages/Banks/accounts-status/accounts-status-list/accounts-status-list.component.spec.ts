import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsStatusListComponent } from './accounts-status-list.component';

describe('AccountsStatusListComponent', () => {
  let component: AccountsStatusListComponent;
  let fixture: ComponentFixture<AccountsStatusListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AccountsStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

