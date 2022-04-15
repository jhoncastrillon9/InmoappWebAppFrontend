import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCommonsComponent } from './base-commons.component';

describe('BaseCommonsComponent', () => {
  let component: BaseCommonsComponent;
  let fixture: ComponentFixture<BaseCommonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCommonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCommonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
