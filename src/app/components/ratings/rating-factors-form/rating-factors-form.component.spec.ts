import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFactorsFormComponent } from './rating-factors-form.component';

describe('RatingFactorsFormComponent', () => {
  let component: RatingFactorsFormComponent;
  let fixture: ComponentFixture<RatingFactorsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingFactorsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFactorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
