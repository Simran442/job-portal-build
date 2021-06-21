import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CurrentUserService } from "../../common/services/user/current-user.service"
import { CustomValidators } from "../../common/directive/custom-validator.directive";
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { AppApi } from "../../../app/app-api";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {
  currentUser;
  jobsList = [];
  showLoader = true;
  constructor(public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getJobsList()
  }

  getJobsList() {
    this.showLoader = true;
    let req = {
      status: 1
    }
    this.authRestService
      .postApi(AppApi.addJobsUrl + '/list', req)
      .then((response) => {
        if (response.status === 1 && response.code === 201) {
          this.showLoader = false;
          this.jobsList = response.data;
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
}

