import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HoldingsTableDataSource, HoldingsTableItem } from './holdings-table-datasource';


import { Holding } from '../classes/holding';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.css']
})
export class HoldingsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HoldingsTableItem>;
  dataLength: number;
  dataSource: HoldingsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'accountId', 
    'type', 
    'symbol', 
    'buyPrice', 
    'amount', 
    'curPrice', 
    'buyDate', 
    'percentChange'
  ];

  constructor(private portfolioService: PortfolioService) {
    this.dataSource = new HoldingsTableDataSource();
  }
  
  ngOnInit() {
    this.dataSource = new HoldingsTableDataSource(this.portfolioService);
    // this.portfolioService.getOrderCount().subscribe({
    //   next: orderCount => {
    // this.dataLength = orderCount;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
