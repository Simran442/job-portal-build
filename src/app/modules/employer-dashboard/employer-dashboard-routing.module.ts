import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerDashboardComponent } from './employer-dashboard.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: EmployerDashboardComponent, canActivate: [AuthGuardService] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerDashboardRoutingModule { }
