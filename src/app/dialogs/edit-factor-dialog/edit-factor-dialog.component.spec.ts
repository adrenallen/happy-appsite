import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactorDialogComponent } from './edit-factor-dialog.component';

describe('EditFactorDialogComponent', () => {
  let component: EditFactorDialogComponent;
  let fixture: ComponentFixture<EditFactorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFactorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFactorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
