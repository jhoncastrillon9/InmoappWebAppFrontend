import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsStatusListComponent } from './contracts-status-list.component';

describe('ContractsStatusListComponent', () => {
  let component: ContractsStatusListComponent;
  let fixture: ComponentFixture<ContractsStatusListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ContractsStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

