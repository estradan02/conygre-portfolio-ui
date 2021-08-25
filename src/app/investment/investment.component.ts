import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PortfolioService } from '../services/portfolio.service';
import { Holding } from '../classes/holding';
//import { Holding } from '../classes/holding';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

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

  date:Date=new Date();

  // allHoldings = {id: 1, accountId:1, type: '', name: '', symbol: '', buyPrice: 1, amount: 1, curPrice: 1, buyDate: '', percentChange: 1}
  allHoldings:Holding[] = new Array()
  x = 1

  constructor(private breakpointObserver: BreakpointObserver, private portfolioService:PortfolioService) {}

  

  ngOnInit(): void {
  }

  makeServiceCall(){
    // we call the service method by subscribing to it
    // remember the api call will be async so subscribing responds when it returns
    this.portfolioService.getHoldings().subscribe((data:Holding[])=>{this.allHoldings = data})
  }

}
