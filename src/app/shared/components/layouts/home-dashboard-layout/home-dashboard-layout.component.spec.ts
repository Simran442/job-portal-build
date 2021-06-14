import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashboardLayoutComponent } from './home-dashboard-layout.component';

describe('HomeDashboardLayoutComponent', () => {
  let component: HomeDashboardLayoutComponent;
  let fixture: ComponentFixture<HomeDashboardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDashboardLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
