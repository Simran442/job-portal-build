import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDetailsComponent } from './job-details.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: JobDetailsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDetailsRoutingModule { }
