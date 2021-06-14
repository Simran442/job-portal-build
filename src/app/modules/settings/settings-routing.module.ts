import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: SettingsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
