import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericHelpComponent } from './generic-help.component';

describe('GenericHelpComponent', () => {
  let component: GenericHelpComponent;
  let fixture: ComponentFixture<GenericHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
