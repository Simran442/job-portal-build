import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeDetailComponent } from "./employee-detail.component";
import { EmployeeDetailRoutingModule } from './employee-detail-routing.module';


@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    EmployeeDetailRoutingModule,
    SharedModule
  ]
})
export class EmployeeDetailModule { }
