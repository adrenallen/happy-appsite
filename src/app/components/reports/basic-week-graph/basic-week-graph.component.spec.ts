import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWeekGraphComponent } from './basic-week-graph.component';

describe('BasicWeekGraphComponent', () => {
  let component: BasicWeekGraphComponent;
  let fixture: ComponentFixture<BasicWeekGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicWeekGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicWeekGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
