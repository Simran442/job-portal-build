import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershipPlanComponent } from './membership-plan.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: MembershipPlanComponent, canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipPlanRoutingModule { }
