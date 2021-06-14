import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component'
import { AuthGuardService } from '../../common/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: MessagesComponent, canActivate: [AuthGuardService] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
