import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CurrentUserService } from 'src/app/common/services/user/current-user.service';
import { CustomValidators } from "../../../common/directive/custom-validator.directive";
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { AppApi } from "../../../../app/app-api";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef | null;
  emplyment_type_list = [{ id: 1, name: 'Any' }, { id: 2, name: 'Full Time' }, { id: 3, name: 'Part Time' }, { id: 4, name: 'Freelance' }];
  jobPostForm: FormGroup;
  constructor(private modalService: BsModalService, private router: Router, public currentUserService: CurrentUserService, public authRestService: AuthRestService) { }

  ngOnInit() {
    this.jobPostForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      salary: new FormControl("", [Validators.required,CustomValidators.numbersOnly]),
      location: new FormControl("", [Validators.required])
    });
  }


  jobModalOpen(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitStep() {
    if (this.jobPostForm.valid) {
      this.authRestService
        .postApiWitoutToken(AppApi.addJobsUrl + '/add', this.jobPostForm.value)
        .then((response) => {
          if (response.status === 1 && response.code === 201) {
            this.jobPostForm.reset();
            this.modalRef.hide();
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
}
