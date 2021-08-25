import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentValueChartComponent } from './investment-value-chart.component';

describe('InvestmentValueChartComponent', () => {
  let component: InvestmentValueChartComponent;
  let fixture: ComponentFixture<InvestmentValueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentValueChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentValueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
