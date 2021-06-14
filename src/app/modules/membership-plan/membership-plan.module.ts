import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MembershipPlanRoutingModule } from './membership-plan-routing.module';
import { MembershipPlanComponent } from './membership-plan.component'

@NgModule({
  declarations: [MembershipPlanComponent],
  imports: [
    CommonModule,
    SharedModule,
    MembershipPlanRoutingModule
  ]
})
export class MembershipPlanModule { }
