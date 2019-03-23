import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorSettingsComponent } from './factor-settings.component';

describe('FactorSettingsComponent', () => {
  let component: FactorSettingsComponent;
  let fixture: ComponentFixture<FactorSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
