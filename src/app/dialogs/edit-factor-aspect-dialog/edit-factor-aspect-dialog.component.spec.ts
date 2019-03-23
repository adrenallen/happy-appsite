import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactorAspectDialogComponent } from './edit-factor-aspect-dialog.component';

describe('EditFactorAspectDialogComponent', () => {
  let component: EditFactorAspectDialogComponent;
  let fixture: ComponentFixture<EditFactorAspectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFactorAspectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFactorAspectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
