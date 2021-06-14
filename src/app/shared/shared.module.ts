import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShowErrorsComponent } from '../errors.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextMaskModule } from 'angular2-text-mask';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeDashboardLayoutComponent } from './components/layouts/home-dashboard-layout/home-dashboard-layout.component';
import { DashboardLayoutComponent } from './components/layouts/dashboard-layout/dashboard-layout.component';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: true,
  allowClear: true,
  noAutoComplete: false
}

@NgModule({
  declarations: [
    ShowErrorsComponent,
    FooterComponent,
    HeaderComponent,
    HomeDashboardLayoutComponent,
    DashboardLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      tapToDismiss: true,
      maxOpened: 1
    }),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSelectModule.forRoot(CustomSelectOptions),
    TextMaskModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ShowErrorsComponent,
    HomeDashboardLayoutComponent,
    DashboardLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    TextMaskModule
  ],
})
export class SharedModule { }
