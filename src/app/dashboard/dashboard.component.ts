import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PortfolioService } from '../services/portfolio.service';
import { Holding } from '../classes/holding';
import { InvestmentComponent } from '../investment/investment.component';
// import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() investmentValue:number = 0
  allHoldings:Holding[] = new Array()

  /** Based on the screen size, switch from standard to one column per row */

  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Valuation Summary', cols: 1, rows: 1 },
  //         { title: 'Investment Value', cols: 1, rows: 1 },
  //         { title: 'Current Holdings', cols: 1, rows: 1 },
  //         { title: 'Cash Value', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Valuation Summary', cols: 2, rows: 1 },
  //       { title: 'Investment Value', cols: 1, rows: 1 },
  //       { title: 'Current Holdings', cols: 1, rows: 2 },
  //       { title: 'Cash Value', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  // miniCardData: userSummary[];
  
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private portfolioService:PortfolioService) {}

  dashboardHoldings(){
    // we call the service method by subscribing to it
    // remember the api call will be async so subscribing responds when it returns
    this.portfolioService.getHoldings().subscribe( (data:Holding[])=>{this.allHoldings = data} )
  }

  totalInvestmentValue(){
    for(let stock of this.allHoldings){
      this.investmentValue += stock.curPrice * stock.amount
    }
  }
}

// , private portfolioService:PortfolioService