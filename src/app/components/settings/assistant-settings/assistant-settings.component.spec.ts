import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantSettingsComponent } from './assistant-settings.component';

describe('AssistantSettingsComponent', () => {
  let component: AssistantSettingsComponent;
  let fixture: ComponentFixture<AssistantSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
