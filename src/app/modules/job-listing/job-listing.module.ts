import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JobListingRoutingModule } from './job-listing-routing.module';
import { JobListingComponent } from "./job-listing.component";

@NgModule({
  declarations: [JobListingComponent],
  imports: [
    CommonModule,
    JobListingRoutingModule,
    SharedModule
  ]
})
export class JobListingModule { }
