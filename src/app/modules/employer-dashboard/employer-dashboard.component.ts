import { Component, OnInit, Renderer, TemplateRef } from '@angular/core';
import { DatatableService } from '.././../common/services/data-table/datatable.service';
import { CurrentUserService } from "../../common/services/user/current-user.service";
import { AppApi } from '../../app-api';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ChangeDateFormatService } from '../../common/services/date-picker/change-date-format.service';
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/common/directive/custom-validator.directive';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css'],
  providers: [DatatableService, CurrentUserService, ChangeDateFormatService, DatePipe]
})
export class EmployerDashboardComponent implements OnInit {
  listener: Function;
  currentUser;
  jobDetails;
  id;
  topAppliedJobs;
  showLoader: boolean = false;
  jobPostForm: FormGroup;
  jobDetail;
  pageMode;
  modalRef: BsModalRef | null;
  emplyment_type_list = [{ id: 1, name: 'Any' }, { id: 2, name: 'Full Time' }, { id: 3, name: 'Part Time' }, { id: 4, name: 'Freelance' }];
  description = [{ id: 1, name: 'Node js' }, { id: 2, name: 'MySQl' }, { id: 3, name: 'Angular Js' }, { id: 4, name: 'React Js' }]
    ;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(
    private renderer: Renderer,
    public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private datatableService: DatatableService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.pageMode = 'editMode';
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
  }

  ngOnInit(): void {
    this.jobPostForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      descriptions: new FormControl("", [Validators.required]),
      salary: new FormControl("", [Validators.required, CustomValidators.numbersOnly]),
      location: new FormControl("", [Validators.required])
    });
    this.getjobsList();
    this.getjobsAwaitingList();
    this.getjobsApprovedList();
    this.getTopAppliedJobs();
  }

  ngAfterViewInit(): void {
    this.listener = this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.path[6].id === 'jobs-list' || event.path[6].id === 'awaiting-list' || event.path[6].id === 'approved-list') {
        if (event.path[0].className === 'fas fa-trash') {
          this.deletePopupOpen(this.datatableService.selectedRow.id);
        } else if (event.path[0].className === 'fas fa-pen') {
          this.updateJob(this.datatableService.selectedRow.id)
        }
      }
    });
  }

  /**
 * Function call to destroy the listener
 */
  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }


  /**
* Function To Get  List
*/
  getjobsList() {
    const tableActions = [
      { name: 'Edit', class: 'fas fa-pen', img: 'eye.svg', title: 'Edit' },
      { name: 'delete', class: 'fas fa-trash', img: 'eye.svg', title: 'Delete' },
    ];
    const url = AppApi.jobsUrl + '/list';
    const reqParam = [
      { key: 'status', value: 0 }
    ];
    const tableColumns = [
      { title: 'Job Title', data: 'title' },
      { title: 'Applicants', data: 'apply_job' },
      { title: 'Status', data: 'status' },
      { title: 'Date Period', data: 'created_at' },
      { title: 'Action', data: 'id' },
    ];

    if (!$.fn.dataTable.isDataTable('#jobs-list')) {
      this.datatableService.commonDataTable('jobs-list', url, 'full_numbers', tableColumns, 10, true, true, 'lt', 'irp', undefined, [0, 'undefined'], '', reqParam, tableActions, 4, 3, '', '', [3], [], [], []);
    } else {
      this.datatableService.commonDataTableReload('jobs-list', url, reqParam);
    }
  }


  /**
   * Function to get all awating jobs
   */
  getjobsAwaitingList() {
    const tableActions = [
      { name: 'delete', class: 'fas fa-trash', img: 'eye.svg', title: 'Delete' },
    ];
    const url = AppApi.jobsUrl + '/list';
    const reqParam = [
      { key: 'status', value: 2 }
    ];
    const tableColumns = [
      { title: 'Job Title', data: 'title' },
      { title: 'Applicants', data: 'apply_job' },
      { title: 'Date Period', data: 'created_at' },
      { title: 'Action', data: 'id' },
    ];

    if (!$.fn.dataTable.isDataTable('#awaiting-list')) {
      this.datatableService.commonDataTable('awaiting-list', url, 'full_numbers', tableColumns, 10, true, true, 'lt', 'irp', undefined, [0, 'undefined'], '', reqParam, tableActions, 3, 2, '', '', [2], [], [], []);
    } else {
      this.datatableService.commonDataTableReload('awaiting-list', url, reqParam);
    }
  }


  /**
   * Function to get all approved jobs
   */
  getjobsApprovedList() {
    const tableActions = [
      { name: 'delete', class: 'fas fa-trash', img: 'eye.svg', title: 'Delete' },
    ];
    const url = AppApi.jobsUrl + '/list';
    const reqParam = [
      { key: 'status', value: 1 }
    ];
    const tableColumns = [
      { title: 'Job Title', data: 'title' },
      { title: 'Applicants', data: 'apply_job' },
      { title: 'Date Period', data: 'created_at' },
      { title: 'Action', data: 'id' },
    ];

    if (!$.fn.dataTable.isDataTable('#approved-list')) {
      this.datatableService.commonDataTable('approved-list', url, 'full_numbers', tableColumns, 10, true, true, 'lt', 'irp', undefined, [0, 'undefined'], '', reqParam, tableActions, 3, 2, '', '', [2], [], [], []);
    } else {
      this.datatableService.commonDataTableReload('approved-list', url, reqParam);
    }
  }




  /**
   * Delete job 
   */
  deletePopupOpen(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this job ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteJobById(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Job is safe :)',
          'error'
        )
      }
    })
  }


  deleteJobById(id) {
    this.authRestService
      .delete(AppApi.jobsUrl + '/' + id)
      .then((response) => {
        if (response.status === 1 && response.code === 201) {
          Swal.fire({
            title: response.message,
            icon: 'success',
            timer: 5000,
            position: "top-right",
            toast: true,
            showCancelButton: false,
            showConfirmButton: false
          })
          this.reloadTable();
        } else if (response.status === 0 && response.code === 201) {
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
      });
  }

  /**
   * 
   * @param id update job details
   */
  updateJob(id) {
    this.id = id;
    this.authRestService
      .getApi(AppApi.jobsUrl + '/' + id)
      .then((response) => {
        if (response.status === 1 && response.code === 200) {
          this.showLoader = false;
          $('#addJobPosrt').click();
          this.jobDetail = response.data;
          this.jobPostForm.patchValue({
            title: this.jobDetail.title,
            type: this.jobDetail.type,
            description: this.jobDetail.description,
            descriptions: this.jobDetail.descriptions,
            salary: this.jobDetail.salary,
            location: this.jobDetail.location
          });
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
  /**
 * Function to reload users list table
 */
  reloadTable() {
    this.datatableService.commonDataTableReload('jobs-list', AppApi.jobsUrl + '/list', [{ key: 'status', value: 0 }]);
    this.datatableService.commonDataTableReload('awaiting-list', AppApi.jobsUrl + '/list', [{ key: 'status', value: 2 }]);
    this.datatableService.commonDataTableReload('approved-list', AppApi.jobsUrl + '/list', [{ key: 'status', value: 1 }]);

  }


  jobModalOpen(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  submitStep() {
    if (this.jobPostForm.valid) {
      this.authRestService
        .putApi(AppApi.jobsUrl + '/' + this.id, this.jobPostForm.value)
        .then((response) => {
          if (response.status === 1 && response.code === 201) {
            this.jobPostForm.reset();
            this.modalRef.hide();
            window.location.reload();
            this.router.navigate(['/employer-dashboard']);
            Swal.fire({
              title: response.message,
              icon: 'success',
              timer: 5000,
              position: "top-right",
              toast: true,
              showCancelButton: false,
              showConfirmButton: false
            })
          } else if (response.status === 0 && response.code === 201) {
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
        });
    } else {
      this.currentUserService.validateAllFormFields(this.jobPostForm);
    }
  }


  closeModal() {
    this.modalRef.hide();
    this.jobPostForm.reset();
  }


  getTopAppliedJobs() {
    this.authRestService
      .getApi(AppApi.topAppliedJobs)
      .then((response) => {
        if (response.status === 1 && response.code === 200) {
          this.topAppliedJobs = response.data;
        } else if (response.status === 0 && response.code === 201) {
          
        } else {
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
      });
  }

  ViewJobsDetail(id) {
    this.router.navigateByUrl('/job-details/' + id)
  }

  startChat(){
    this.router.navigateByUrl("/messages")
  }

}


