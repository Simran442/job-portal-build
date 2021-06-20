import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaticPagesModule } from '../../src/app/modules/static-pages/static-pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentUserService } from './common/services/user/current-user.service';
import { ApiService, Interceptor } from './common/services/rest-api/api.service';
import { SharedModule } from './shared/shared.module'; // import the shared modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './common/services/auth-guard.service';
import { AuthRestService } from './common/services/auth/auth-rest.service';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChangeDateFormatService } from './common/services/date-picker/change-date-format.service';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StaticPagesModule,
    BrowserAnimationsModule
  ],
  exports:[SharedModule],
  providers: [CurrentUserService, AuthRestService,ChangeDateFormatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    ApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
