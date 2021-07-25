import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './common/services/auth-guard.service';
import { HomeDashboardLayoutComponent } from './shared/components/layouts/home-dashboard-layout/home-dashboard-layout.component';
import { DashboardLayoutComponent } from './shared/components/layouts/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  {
    path: '',
    component: HomeDashboardLayoutComponent,
    children: [
      { path: '', loadChildren: './modules/static-pages/static-pages.module#StaticPagesModule' }

    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'employee-detail', loadChildren: './modules/employee-detail/employee-detail.module#EmployeeDetailModule', canActivate: [AuthGuardService] },
      { path: 'messages', loadChildren: './modules/messages/messages.module#MessagesModule', canActivate: [AuthGuardService] },
      { path: 'membership-plan', loadChildren: './modules/membership-plan/membership-plan.module#MembershipPlanModule', canActivate: [AuthGuardService] },
      { path: 'job-listing', loadChildren: './modules/job-listing/job-listing.module#JobListingModule', canActivate: [AuthGuardService] },
      { path: 'employer-dashboard', loadChildren: './modules//employer-dashboard/employer-dashboard.module#EmployerDashboardModule', canActivate: [AuthGuardService] },
      { path: 'job-details/:id', loadChildren: './modules/job-details/job-details.module#JobDetailsModule', canActivate: [AuthGuardService] },
      { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule', canActivate: [AuthGuardService] }
    ]
  },
  // { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
