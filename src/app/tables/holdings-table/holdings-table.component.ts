import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HoldingsTableDataSource } from './holdings-table-datasource';

import { PortfolioService } from 'src/app/services/portfolio.service';
import { Holding } from 'src/app/classes/holding';

@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.css']
})
export class HoldingsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Holding>;
  dataLength!: number;
  dataSource!: HoldingsTableDataSource;
  errorMessage!: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    // 'id',
    // 'accountId', 
    'type', 
    'symbol', 
    'name',
    'buyPrice', 
    'amount', 
    'curPrice', 
    'buyDate', 
    'percentChange'
  ];

  constructor(private portfolioService: PortfolioService){
    this.dataSource = new HoldingsTableDataSource(this.portfolioService);
  }

  ngOnInit() {
    this.dataSource = new HoldingsTableDataSource(this.portfolioService);
    this.portfolioService.getHoldingCount().subscribe({
      next: holdingCount => {
        this.dataLength = holdingCount;
        console.log(this.dataLength);
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}