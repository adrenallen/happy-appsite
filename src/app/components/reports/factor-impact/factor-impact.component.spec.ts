import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorImpactComponent } from './factor-impact.component';

describe('FactorImpactComponent', () => {
  let component: FactorImpactComponent;
  let fixture: ComponentFixture<FactorImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
