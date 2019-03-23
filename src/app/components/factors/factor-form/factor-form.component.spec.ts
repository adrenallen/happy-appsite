import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorFormComponent } from './factor-form.component';

describe('FactorFormComponent', () => {
  let component: FactorFormComponent;
  let fixture: ComponentFixture<FactorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
