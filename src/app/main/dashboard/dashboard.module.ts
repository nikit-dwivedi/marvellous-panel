import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from 'app/services/auth.guard';
import { HomeComponent } from './home/home.component';
import { ReferalComponent } from './referal/referal.component';
import {DatePipe} from '@angular/common';
import { AllInvestmentComponent } from './all-investment/all-investment.component';
import { InvestmentByIdComponent } from './investment-by-id/investment-by-id.component';
import { AllCustomerComponent } from './all-customer/all-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { SettelmentComponent } from './settelment/settelment.component';



const routes: Routes = [
 
  { 
    path: '',
   component: HomeComponent,
   canActivate:[AuthGuard]
  },
  { 
    path: 'home',
   component: HomeComponent,
   canActivate:[AuthGuard]
  },
  { 
    path: 'allInvestment',
   component: AllInvestmentComponent,
   canActivate:[AuthGuard]
  },

  { 
    path: 'allCustomer',
   component: AllCustomerComponent,
   canActivate:[AuthGuard]
  },

  { 
    path: 'customerDetails',
   component: CustomerDetailsComponent ,
   canActivate:[AuthGuard]
  },

  { 
    path: 'investmentById',
   component: InvestmentByIdComponent ,
   canActivate:[AuthGuard]
  },
  { 
    path: 'kycList',
   component: KycListComponent ,
   canActivate:[AuthGuard]
  },
  { 
    path: 'settelment',
   component: SettelmentComponent ,
   canActivate:[AuthGuard]
  },
  { 
    path: 'referal',
   component: ReferalComponent ,
   canActivate:[AuthGuard]
  },
  
  
]


@NgModule({
  declarations: [
  HomeComponent,
  
  ReferalComponent,
  AllInvestmentComponent,
  InvestmentByIdComponent,
  AllCustomerComponent,
  CustomerDetailsComponent,
  KycListComponent,
  SettelmentComponent,
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)

    
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
