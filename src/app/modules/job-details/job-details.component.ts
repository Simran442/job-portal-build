import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CurrentUserService } from "../../common/services/user/current-user.service"
import { CustomValidators } from "../../common/directive/custom-validator.directive";
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { AppApi } from "../../../app/app-api";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  showLoader;
  jobDetail;
  constructor(public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getJobsView(id);
    });
  }

  getJobsView(id) {
    this.showLoader = true;
    this.authRestService
      .getApi(AppApi.jobsUrl + '/' + id)
      .then((response) => {
        if (response.status === 1 && response.code === 200) {
          this.showLoader = false;
         this.jobDetail = response.data;
        } else if (response.status === 0 && response.code === 200) {
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

  applyJob(id) {
    this.showLoader = true;
    this.authRestService
      .postApi(AppApi.applyJobsUrl + '/' + id, [])
      .then((response) => {
        if (response.status === 1 && response.code === 201) {
          this.showLoader = false;
          this.router.navigateByUrl("/job-listing")
          Swal.fire({
            title: 'Job Sucessfully Applied',
            icon: 'success',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          })
        } else if (response.status === 0 && response.code === 201) {
          this.showLoader = false;
          Swal.fire({
            title: response.message,
            icon: 'error',
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
