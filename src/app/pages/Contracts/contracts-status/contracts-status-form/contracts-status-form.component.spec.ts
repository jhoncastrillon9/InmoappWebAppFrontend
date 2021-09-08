import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsStatusFormComponent } from './contracts-status-form.component';

describe('ContractsStatusFormComponent', () => {
  let component: ContractsStatusFormComponent;
  let fixture: ComponentFixture<ContractsStatusFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ContractsStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

