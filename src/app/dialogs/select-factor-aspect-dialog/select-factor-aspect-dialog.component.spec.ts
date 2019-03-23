import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFactorAspectDialogComponent } from './select-factor-aspect-dialog.component';

describe('SelectFactorAspectDialogComponent', () => {
  let component: SelectFactorAspectDialogComponent;
  let fixture: ComponentFixture<SelectFactorAspectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFactorAspectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFactorAspectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
