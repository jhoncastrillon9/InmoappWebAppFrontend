import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBankAccountFormComponent } from './history-bank-account-form.component';

describe('HistoryBankAccountFormComponent', () => {
  let component: HistoryBankAccountFormComponent;
  let fixture: ComponentFixture<HistoryBankAccountFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBankAccountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBankAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

