import { Injectable } from '@angular/core';
import { Holding } from 'src/app/classes/holding';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';   // HttpClient Service
import { Observable, throwError } from 'rxjs'                           // Observable returned from HttpClient methods
import { catchError, map } from 'rxjs/operators';
import { MarketMover } from '../classes/marketmover';

@Injectable({
  providedIn: 'root'
})

 export class PortfolioService {
  // private baseURL = "http://springbootportfolioproject-springbootportfolioproject.namdevops3.conygre.com/portfolio-manager"
  private baseURL = "http://springbootportfolioproject-springbootportfolioproject.namdevops3.conygre.com/portfolio-manager"
  


  constructor(private httpClient: HttpClient) { }             // Inject HttpClient service!

  // public getHoldings() : Observable<Holding[]> {             // getting holdings
  //   return this.httpClient.get<Holding[]>(`${this.baseURL}/user/holdings`)
  // }

  public getMarketMovers() : Observable<MarketMover[]> {
    return this.httpClient.get<MarketMover[]>(`${this.baseURL}/marketmovers`)
  }
  
  public getHoldings(offset?: number, pageSize?: number, sortField?: string, sortDirection?: string) : Observable<Holding[]> {
    return this.httpClient.get<Holding[]>(`${this.baseURL}/accounts/1/holdings`).pipe(
      map((response) => {
        return this.getPagedData(
          this.getSortedData(
            response,
            sortField!,
            sortDirection!),
          offset!, pageSize!);
      }),
      catchError(this.handleError)
    );
  }

  public getHoldingCount(): Observable<number> {
    return this.httpClient.get<Holding[]>(`${this.baseURL}/accounts/1/holdings`).pipe(
      map((response) => {
        return response.length;
      }));
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    return throwError(`An error occurred: ${err}`);
  }

  private getPagedData(data: Holding[], startIndex: number, pageSize: number) {
    return data.splice(startIndex, pageSize);
  }

private getSortedData(data: Holding[], active: string, direction: string) {
  if (!active || direction === '') {
    return data;
  }


  return data.sort((a, b) => {
    const isAsc = direction === 'asc';
    switch (active) {
      case "id": return compare(+a.id, +b.id, isAsc);
      case "accountId": return compare(+a.accountId, +b.accountId, isAsc);
      case "type": return compare(+a.type, +b.type, isAsc);
      case "name": return compare(+a.name, +b.name, isAsc);
      case "symbol": return compare(+a.symbol, +b.symbol, isAsc);
      case "buyPrice": return compare(+a.buyPrice, +b.buyPrice, isAsc);
      case "amount": return compare(+a.amount, +b.amount, isAsc);
      case "curPrice": return compare(+a.curPrice, +b.curPrice, isAsc);
      case "buyDate": return compare(+a.buyDate, +b.buyDate, isAsc);
      case "percentChange": return compare(+a.percentChange, +b.percentChange, isAsc);
      default: return 0;
    }
  }
  );

  function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  
}

}