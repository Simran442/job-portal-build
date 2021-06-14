import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core'; // to make its methos available in all other methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr'; // add toster service
import { CurrentUserService } from '../user/current-user.service'; //  contain all metaData of loggedIn User
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable()
export class ApiService {
  public currentUser: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private toastrService: ToastrService) {
  }
  /**
   * Generic Get Method
   * @param apiUrl - Api URL
   */
  getApi(apiUrl: string) {
    return this.http.get<any>(apiUrl, {
      headers: {
        'content-type': 'application/json',
        Authorization: this.currentUserService.token
      }
    })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  /**
   * Generic Post Method
   * @param apiUrl - Api URL
   * @param body - Body of API
   */
  postApi(apiUrl: string, body: any) {
    return this.http.post<any>(apiUrl, body, {
      headers: {
        'content-type': 'application/json',
        Authorization: this.currentUserService.token
      }
    })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  /**
   * Generic PUT Method
   * @param apiUrl - Api URL
   * @param body - Body of API
   */
  putApi(apiUrl: string, body: any) {
    return this.http.put<any>(apiUrl, body, {
      headers: {
        'content-type': 'application/json',
        Authorization: this.currentUserService.token
      }
    })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  // Delete method to Access api of Delete type
  delete<T>(url: string): Observable<any> {
    return this.http.delete<any>(url)
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, url)));
  }


  // Patch method to Access api of Patch type
  patch<T>(url: string, body: string): Observable<any> {
    return this.http.patch<any>(url, body)
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, url)));
  }

  // sendFormData method to Access api of post form data
  sendFormData(apiUrl: string, body: any) {
    return this.http.post<any>(apiUrl, body)
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  // sendFormDataPutApi method to Access api of put form data
  sendFormDataPutApi(apiUrl: string, body: any) {
    return this.http.put<any>(apiUrl, body, { headers: { 'Authorization': this.currentUserService.token } })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  // catch error if API throws any error
  errorHandler(error: any, apiURl: string): void {
    if (error.message.includes('Unauthorized')) {
      Swal.fire({
        title: 'O token de autorização é inválido.',
        icon: 'error',
        timer: 5000,
        position: "top-right",
        toast: true,
        showCancelButton: false,
        showConfirmButton: false
      })
      localStorage.clear();
      this.router.navigateByUrl("/login");
    }
  }

  loginerrorHandler(error: any, apiURl: string): void {
    Swal.fire({
      title: 'Credenciais inválidas.',
      icon: 'error',
      timer: 5000,
      position: "top-right",
      toast: true,
      showCancelButton: false,
      showConfirmButton: false
    })
  }

  postApiWitoutToken(apiUrl: string, body: any) {
    return this.http.post<any>(apiUrl, body, {
      headers:
        { 'content-type': 'application/json' }
    })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

  /**
 * Generic PUT Method
 * @param apiUrl - Api URL
 * @param body - Body of API
 */
  putApiWitoutToken(apiUrl: string, body: any) {
    return this.http.put<any>(apiUrl, body, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }


  getApiWitoutToken(apiUrl: string) {
    return this.http.get<any>(apiUrl, { headers: { 'content-type': 'application/json' } })
      .map(response => response)
      .catch((e: any) => Observable.throw(this.errorHandler(e, apiUrl)));
  }

}

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private currentUserService: CurrentUserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string; // get the token from a service
    if (this.currentUserService.token !== 'Bearer null') { // check whether user is loggedIn
      token = this.currentUserService.token;
    } else {
      token = ''; // else set token to the login request
    }
    // token = this.currentUserService.token;
    // setting the accept header
    if (token) {
      this.currentUserService.token = token;
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({});
    }
    return next.handle(req);
  }

}
