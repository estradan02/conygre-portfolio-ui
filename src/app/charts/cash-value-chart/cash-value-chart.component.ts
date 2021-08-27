import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-cash-value-chart',
  templateUrl: './cash-value-chart.component.html',
  styleUrls: ['./cash-value-chart.component.css']
})
export class CashValueChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Cash' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#a0c4ff',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.getAccountCashHistory().subscribe({
      next: cashItem => {
        cashItem.forEach(li => {
          this.lineChartData[0].data?.push(li.netWorth);
          this.lineChartLabels.push(li.closingDate);
        });
      }
    });
    }
  }
