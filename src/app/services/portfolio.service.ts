// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Holding } from 'src/app/classes/holding';
import { HttpClient } from '@angular/common/http';          // HttpClient Service
import { Observable } from 'rxjs'                           // Observable returned from HttpClient methods

@Injectable({
  providedIn: 'root'
})

 export class PortfolioService {
  private baseURL = "http://springbootportfolioproject-springbootportfolioproject.namdevops3.conygre.com"

  constructor(private httpClient: HttpClient) { }             // Inject HttpClient service!

  public getHoldings() : Observable<Holding[]> {             // getting holdings
    return this.httpClient.get<Holding[]>(`${this.baseURL}/portfolio-manager/user/holdings`)
  }
  
  // private salesUrl = 'api/sales/sales.json';

//   constructor(private http: HttpClient) { }

//   getUser(): Observable<MonthlySales[]>{
//     return this.http.get<MonthlySales[]>(this.salesUrl).pipe(catchError(this.handleError));
//   }

//   private handleError(err: HttpErrorResponse){
//     return throwError(`An error occurred: ${err}`);
//   }
}
