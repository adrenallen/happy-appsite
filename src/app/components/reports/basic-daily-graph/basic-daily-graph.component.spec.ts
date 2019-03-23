import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDailyGraphComponent } from './basic-daily-graph.component';

describe('BasicDailyGraphComponent', () => {
  let component: BasicDailyGraphComponent;
  let fixture: ComponentFixture<BasicDailyGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDailyGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDailyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
