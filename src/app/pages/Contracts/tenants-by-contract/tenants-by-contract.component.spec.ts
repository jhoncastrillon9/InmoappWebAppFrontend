import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsByContractComponent } from './tenants-by-contract.component';

describe('TenantsByContractComponent', () => {
  let component: TenantsByContractComponent;
  let fixture: ComponentFixture<TenantsByContractComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TenantsByContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsByContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

