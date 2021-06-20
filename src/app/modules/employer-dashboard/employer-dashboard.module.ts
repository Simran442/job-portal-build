import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EmployerDashboardComponent } from "./employer-dashboard.component";
import { EmployerDashboardRoutingModule } from './employer-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EmployerDashboardComponent],
  imports: [
    CommonModule,
    EmployerDashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployerDashboardModule { }
