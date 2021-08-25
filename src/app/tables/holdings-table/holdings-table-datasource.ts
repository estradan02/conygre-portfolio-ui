import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';

// TODO: Replace this with your own data model type
export interface HoldingsTableItem {
  id: number;
  accountId: number;
  type: string;
  symbol: string;
  buyPrice: number;
  amount: number;
  curPrice: number;
  buyDate: string;
  percentChange: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: HoldingsTableItem[] = [
  {id: 1,  accountId:3, type: "Invest", symbol: 'Hydrogen' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 2,  accountId:3, type: "Invest", symbol: 'Helium' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 3,  accountId:3, type: "Invest", symbol: 'Lithium' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 4,  accountId:3, type: "Invest", symbol: 'Beryllium' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 5,  accountId:3, type: "Invest", symbol: 'Boron' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 6,  accountId:3, type: "Invest", symbol: 'Carbon' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 7,  accountId:3, type: "Invest", symbol: 'Nitrogen' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 8,  accountId:3, type: "Invest", symbol: 'Oxygen' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5},
  {id: 9,  accountId:3, type: "Invest", symbol: 'Fluorine' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 10, accountId:3, type: "Invest", symbol: 'Neon' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 11, accountId:3, type: "Invest", symbol: 'Sodium' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5},
  {id: 12, accountId:3, type: "Invest", symbol: 'Magnesium' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 13, accountId:3, type: "Invest", symbol: 'Aluminum' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 },
  {id: 14, accountId:3, type: "Invest", symbol: 'Silicon' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5},
  {id: 15, accountId:3, type: "Invest", symbol: 'Phosphorus' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5 ,
  {id: 16, accountId:3, type: "Invest", symbol: 'Sulfur' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5},
  {id: 17, accountId:3, type: "Invest", symbol: 'Chlorine' ,buyPrice: 34, amount: 5, curPrice: 40, buyDate: "1/1/2021", percentChange: 5}

];

/**
 * Data source for the HoldingsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HoldingsTableDataSource extends DataSource<HoldingsTableItem> {
  data: HoldingsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private portfolioService: PortfolioService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HoldingsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      const dataMutations = [
        of('Initial load'),
        this.paginator.page,
        this.sort.sortChange
      ];
      // return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange, dataMutations)
      //   .pipe(map(() => {
      //     return this.getPagedData(this.getSortedData([...this.data ]));
      //   }));
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange, dataMutations).pipe(mergeMap(() => {
        return this.portfolioService.getHoldings(
          this.paginator.pageIndex * this.paginator.pageSize,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction
        );
      }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: HoldingsTableItem[]): HoldingsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: HoldingsTableItem[]): HoldingsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
