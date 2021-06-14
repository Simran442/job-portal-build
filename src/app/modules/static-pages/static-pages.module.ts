import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, ContactComponent, AboutComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxSelectModule,
    StaticPagesRoutingModule
  ]
})
export class StaticPagesModule { }
