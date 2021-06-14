import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EmployerDashboardComponent } from "./employer-dashboard.component";
import { EmployerDashboardRoutingModule } from './employer-dashboard-routing.module';


@NgModule({
  declarations: [EmployerDashboardComponent],
  imports: [
    CommonModule,
    EmployerDashboardRoutingModule,
    SharedModule
  ]
})
export class EmployerDashboardModule { }
