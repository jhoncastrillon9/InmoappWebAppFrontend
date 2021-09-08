import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsStatusComponent } from './contracts-status.component';

describe('ContractsStatusComponent', () => {
  let component: ContractsStatusComponent;
  let fixture: ComponentFixture<ContractsStatusComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ContractsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

