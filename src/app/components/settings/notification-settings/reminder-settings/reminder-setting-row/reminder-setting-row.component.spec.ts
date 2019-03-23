import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderSettingRowComponent } from './reminder-setting-row.component';

describe('ReminderSettingRowComponent', () => {
  let component: ReminderSettingRowComponent;
  let fixture: ComponentFixture<ReminderSettingRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderSettingRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderSettingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
