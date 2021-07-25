import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppApi } from 'src/app/app-api';
import { CustomValidators } from 'src/app/common/directive/custom-validator.directive';
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { CurrentUserService } from 'src/app/common/services/user/current-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser;
  showLoader;
  ProfileForm: FormGroup;
  userDetails;
  userId;
  constructor(public authRestService: AuthRestService,public currentUserService: CurrentUserService, private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
  }

  ngOnInit(): void {

    this.ProfileForm = new FormGroup({
      email: new FormControl("", [Validators.required, CustomValidators.vaildEmail]),
      phone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
    })

    this.getUserProfileDetail(this.currentUser.id)
    this.userId= this.currentUser.id;
  }

  /**
   * 
   * @param userId funtion for  get user details
   */
  getUserProfileDetail(userId) {
    this.showLoader = true;
    let req = {
      "draw": 1, "columns": [{ "data": "title", "name": "", "searchable": true, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "id", "name": "", "searchable": true, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "created_at", "name": "", "searchable": false, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "id", "name": "", "searchable": false, "orderable": false, "search": { "value": "", "regex": false } }], "order": [], "start": 0, "length": 10, "search": { "value": "", "regex": false }, "status": 2
    }
    this.authRestService
      .getApi(AppApi.UsersUrl + '/profile/' + userId)
      .then((response) => {
        if (response.status === 1 && response.code === 200) {
          this.showLoader = false;
          this.userDetails = response.data;
          this.ProfileForm.patchValue({
            email: this.userDetails.email,
            phone: this.userDetails.phone
          })
        } else if (response.status === 0 && response.code === 201) {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'success',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          })
        } else {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'error',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          });
        }
      })
  }

  /**
   * function for update user details
   */
  updateProfile() {
    if (this.ProfileForm.valid) {
      this.authRestService
      .putApi(AppApi.UsersUrl + '/profile/' + this.userId, this.ProfileForm.value)
      .then((response) => {
        if (response.status === 1 && response.code === 201) {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'success',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          })
          this.router.navigate(['job-listing']);
        } else if (response.status === 0 && response.code === 201) {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'success',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          })
        } else {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'error',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          });
        }
      })
    }else{
      this.currentUserService.validateAllFormFields(this.ProfileForm);
    }
  }


}
