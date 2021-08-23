import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashValueChartComponent } from './cash-value-chart.component';

describe('CashValueChartComponent', () => {
  let component: CashValueChartComponent;
  let fixture: ComponentFixture<CashValueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashValueChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashValueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
