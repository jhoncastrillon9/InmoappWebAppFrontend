import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaListComponent } from './iva-list.component';

describe('IvaListComponent', () => {
  let component: IvaListComponent;
  let fixture: ComponentFixture<IvaListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ IvaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

