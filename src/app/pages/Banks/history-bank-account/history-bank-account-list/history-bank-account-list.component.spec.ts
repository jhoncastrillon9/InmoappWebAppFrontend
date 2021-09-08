import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBankAccountListComponent } from './history-bank-account-list.component';

describe('HistoryBankAccountListComponent', () => {
  let component: HistoryBankAccountListComponent;
  let fixture: ComponentFixture<HistoryBankAccountListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBankAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBankAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

