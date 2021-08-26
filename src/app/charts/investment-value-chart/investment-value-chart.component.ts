import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-investment-value-chart',
  templateUrl: './investment-value-chart.component.html',
  styleUrls: ['./investment-value-chart.component.css']
})
export class InvestmentValueChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Investment' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#caffbf',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.getAccountInvestmentHistory().subscribe({
      next: investItem => {
        investItem.forEach(li => {
          this.lineChartData[0].data?.push(li.netWorth);
          this.lineChartLabels.push(li.closingDate);
        });
      }
    });
    }
  }
