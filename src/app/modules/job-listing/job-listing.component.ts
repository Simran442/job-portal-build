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
  searchForm: FormGroup;
  showLoader = true;
  constructor(public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getJobsList()
    this.searchForm = new FormGroup({
      searchBy: new FormControl("1", [Validators.required]),
      search: new FormControl("", []),
    })
  }

  getJobsList() {
    this.showLoader = true;
    let req = {
      "draw": 1, "columns": [{ "data": "title", "name": "", "searchable": true, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "id", "name": "", "searchable": true, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "created_at", "name": "", "searchable": false, "orderable": false, "search": { "value": "", "regex": false } }, { "data": "id", "name": "", "searchable": false, "orderable": false, "search": { "value": "", "regex": false } }], "order": [], "start": 0, "length": 10, "search": { "value": "", "regex": false }, "status": 1
    }
    this.authRestService
      .postApi(AppApi.jobsUrl + '/list', req)
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

  applyJob(id) {
    this.showLoader = true;
    this.authRestService
      .postApi(AppApi.applyJobsUrl + '/' + id, [])
      .then((response) => {
        if (response.status === 1 && response.code === 201) {
          this.showLoader = false;
          this.getJobsList();
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

  ViewJobsDetail(id) {
    this.router.navigateByUrl('job-details/' + id)
  }

  searchfilter(value) {
    let payload = {
      searchBy: this.searchForm.value.searchBy,
      search: this.searchForm.value.search
    }

    this.authRestService
      .postApi(AppApi.jobsUrl + '/search', payload)
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

  /**
   * 
   * @param id 
   * set values
   */
  selectCheckbox(id) {
    this.searchForm.patchValue({
      searchBy: id
    })
  }
}

