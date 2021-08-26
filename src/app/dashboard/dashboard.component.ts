import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PortfolioService } from '../services/portfolio.service';
import { Holding } from '../classes/holding';
import { UserSummary } from '../classes/user-summary';
import { InvestmentComponent } from '../investment/investment.component';
import { MarketMover } from '../classes/marketmover';
import { Account } from '../classes/account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @Input() investmentValue:number = 0;
  allHoldings:Holding[] = new Array();
  allMarketMovers:MarketMover[] = new Array();
  miniCardData:UserSummary[] = new Array();
  userAccount:Account[] = new Array();

  /** Based on the screen size, switch from standard to one column per row */
  
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

  ngOnInit(){
    // this.portfolioService.getUserSummary().subscribe({
    //   next: summaryData => {
    //     this.miniCardData = summaryData;
    //   }
    // })
    this.userAccounts();
    this.makeMarketMoversCall();
  }

  userAccounts() {
    this.portfolioService.getAccountForUser().subscribe( (data:Account[])=>{this.userAccount = data})
    return console.log(this.userAccount)
  }

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

  makeMarketMoversCall(){
    // we call the service method by subscribing to it
    // remember the api call will be async so subscribing responds when it returns
    this.portfolioService.getMarketMovers().subscribe((data:MarketMover[])=>{this.allMarketMovers = data})
  }

}