import { Injectable, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonApi } from '../../common-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/Constants';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class CurrentUserService {
  token: string = localStorage.getItem('currentUserToken'); // LoggedIn User Token
  @Output() getLoggedInProfileImage: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  /**
   * Set verified user
   * @param user user data
   */
  setVerifiedUser(user: any) {
    if (user) {
      localStorage.clear();
      localStorage.setItem('currentUserId', JSON.stringify(user.data.id));
      localStorage.setItem('currentUser', JSON.stringify(user.data));
      localStorage.setItem('currentUserToken', user.token);
      localStorage.setItem('isUserLoggedIn', 'true');
      localStorage.setItem('isLoginFirst', '1');
      this.token = 'Bearer ' + localStorage.getItem('currentUserToken');
    }
  }

  /**
   * Get verified user details
   * @param user user
   */
  getVerifiedUser() {
    if (localStorage.getItem('isUserLoggedIn')) {
      let currentUser:any = JSON.parse(localStorage.getItem('currentUser'));
      this.getLoggedInProfileImage.emit(currentUser.profile_pic);
      return currentUser;
    } else {
      return false;
    }
  }

  /**
   * Verify if user is logged in or not
   * @param url
   * @returns {boolean}
   */
  public verifyLogin(url: string): boolean {
    if (localStorage.getItem('isUserLoggedIn')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  /**
   * Check if logged in
   * @returns {boolean}
   */
  public isUserLoggedIn() {
    if (localStorage.getItem('isUserLoggedIn')) {
      return true;
    }
    return false;
  }

  /**
   * Function to toggle all buttons
   * @param btnId butonId
   */
  OpenCloseModal(btnId: string) {
    $('#' + btnId).click();
  }

  /**
   * Funtion to display error mesaages
   */
  errorValidator(errors: any) {
    const errorMessages: any = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessages.push(errors[key]);
      }
    }
    return this.toastrService.error(errorMessages);
  }

  /**
  * Validate the user role form fields
  * @param formGroup form group
  */
  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Function to convert to brazil currency.
   * @param value 
   */
  convertToBarzilCurrency(value, currency) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{1})(\d{1,2})$/, "$1,$2")
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    value = value.replace(/^(\d)/g, currency == 'AmericanDollar' ? "US$ $1" : "R$ $1")
    return value;
  }


}
