import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaFormComponent } from './iva-form.component';

describe('IvaFormComponent', () => {
  let component: IvaFormComponent;
  let fixture: ComponentFixture<IvaFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ IvaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

