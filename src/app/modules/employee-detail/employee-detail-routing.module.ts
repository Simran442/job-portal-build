import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: EmployeeDetailComponent ,canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailRoutingModule { }
