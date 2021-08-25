import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardComponent } from './card/card.component';
import { InvestmentValueChartComponent } from './charts/investment-value-chart/investment-value-chart.component';
import { CashValueChartComponent } from './charts/cash-value-chart/cash-value-chart.component';
import { InvestmentComponent } from './investment/investment.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { HoldingsTableComponent } from './tables/holdings-table/holdings-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    CardComponent,
    InvestmentValueChartComponent,
    CashValueChartComponent,
    InvestmentComponent,
    MiniCardComponent,
    HoldingsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatChipsModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
