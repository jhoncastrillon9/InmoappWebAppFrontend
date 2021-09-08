import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsByContractListComponent } from './tenants-by-contract-list.component';

describe('TenantsByContractListComponent', () => {
  let component: TenantsByContractListComponent;
  let fixture: ComponentFixture<TenantsByContractListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TenantsByContractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsByContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

