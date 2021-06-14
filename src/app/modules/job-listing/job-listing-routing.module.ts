import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListingComponent } from './job-listing.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: JobListingComponent, canActivate: [AuthGuardService] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobListingRoutingModule { }
