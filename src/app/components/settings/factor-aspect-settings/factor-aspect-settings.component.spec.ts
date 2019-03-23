import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorAspectSettingsComponent } from './factor-aspect-settings.component';

describe('FactorAspectSettingsComponent', () => {
  let component: FactorAspectSettingsComponent;
  let fixture: ComponentFixture<FactorAspectSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorAspectSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorAspectSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
