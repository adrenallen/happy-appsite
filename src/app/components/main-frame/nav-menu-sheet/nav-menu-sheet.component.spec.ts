import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuSheetComponent } from './nav-menu-sheet.component';

describe('NavMenuSheetComponent', () => {
  let component: NavMenuSheetComponent;
  let fixture: ComponentFixture<NavMenuSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
