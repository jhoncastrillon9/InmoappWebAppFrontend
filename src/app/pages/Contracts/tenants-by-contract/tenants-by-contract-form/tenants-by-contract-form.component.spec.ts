import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsByContractFormComponent } from './tenants-by-contract-form.component';

describe('TenantsByContractFormComponent', () => {
  let component: TenantsByContractFormComponent;
  let fixture: ComponentFixture<TenantsByContractFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TenantsByContractFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsByContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

