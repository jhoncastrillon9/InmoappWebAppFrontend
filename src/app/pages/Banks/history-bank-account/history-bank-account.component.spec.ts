import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBankAccountComponent } from './history-bank-account.component';

describe('HistoryBankAccountComponent', () => {
  let component: HistoryBankAccountComponent;
  let fixture: ComponentFixture<HistoryBankAccountComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBankAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

