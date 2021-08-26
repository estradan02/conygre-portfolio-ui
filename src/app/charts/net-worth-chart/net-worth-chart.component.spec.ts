import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthChartComponent } from './net-worth-chart.component';

describe('NetWorthChartComponent', () => {
  let component: NetWorthChartComponent;
  let fixture: ComponentFixture<NetWorthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
