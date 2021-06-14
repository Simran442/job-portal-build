import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailsComponent } from "./job-details.component";
import { JobDetailsRoutingModule } from './job-details-routing.module';


@NgModule({
  declarations: [JobDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobDetailsRoutingModule
  ]
})
export class JobDetailsModule { }
