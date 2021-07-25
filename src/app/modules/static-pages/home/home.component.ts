import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CurrentUserService } from "../../../common/services/user/current-user.service"
import { CustomValidators } from "../../../common/directive/custom-validator.directive";
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { AppApi } from "../../../../app/app-api";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  'selector': 'app-home',
  'templateUrl': './home.component.html',
  'styleUrls': ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup
  loginForm: FormGroup
  forgetForm: FormGroup;
  stepTwo: boolean = false;
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  currentUser;
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  education = [{ id: 1, name: 'School' }, { id: 2, name: 'Bachelors' }, { id: 3, name: 'Masters' }, { id: 4, name: 'PHD' }];
  startyear = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  endyear = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  constructor(
    public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, CustomValidators.vaildEmail]),
      role_id: new FormControl("2", []),
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      rememberMe: new FormControl('', [Validators.required]),
      location: new FormControl('', []),
      business_name: new FormControl('', []),
      Image: new FormControl('', []),
      education: this.fb.array([this.fb.group({
        education: new FormControl(null, []),
        education_detail: new FormControl(null, []),
      })]),
      experience: this.fb.array([this.fb.group({
        company_name: new FormControl("", []),
        end_year: new FormControl("", []),
        start_year: new FormControl("", []),
        profile: new FormControl("", [])
      })])
    });
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
    });
    this.forgetForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    });
  }

  ngAfterViewInit(){

  }

  get getEducation() {
    return this.registerForm.get('education') as FormArray;
  }
  get getExperience() {
    return this.registerForm.get('experience') as FormArray;
  }

  setFormToEmployer(type) {
    if (!this.stepTwo) {
      if (type == "1") {
        this.registerForm.controls.education.setErrors(null);
        this.registerForm.controls.experience.setErrors(null);
      } else {
        this.registerForm.controls.education.setErrors(null);
        this.registerForm.controls.experience.setErrors(null);
      }

      this.registerForm.patchValue({
        role_id: type
      })
    }
  }

  addMore() {
    (this.registerForm.controls.education as FormArray).push(this.fb.group({
      id: new FormControl(null, []),
      education_detail: new FormControl(null, [])
    }));
  }

  addMoreExperience() {
    (this.registerForm.controls.experience as FormArray).push(this.fb.group({
      id: new FormControl(null, []),
      company_name: new FormControl("", []),
      end_year: new FormControl("", []),
      start_year: new FormControl("", []),
      profile: new FormControl("", [])
    }));
  }

  submitForm(type) {
    if (this.registerForm.valid) {
      if (!this.stepTwo) {
        this.stepTwo = true;
        // this.registerForm.value.education.setErrors({ required: true })
        // this.registerForm.value.education.experience({ required: true })
      } else {
        delete this.registerForm.value.confirmPassword
        this.authRestService
          .postApiWitoutToken(AppApi.registerUrl, this.registerForm.value)
          .then((response) => {
            if (response.status === 1 && response.code === 201) {
              this.registerForm.reset();
              this.modalRef.hide();
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
      }
    } else {
      this.currentUserService.validateAllFormFields(this.registerForm);
    }

  }

  openModal(template: TemplateRef<any>) {
    this.stepTwo = false;
    this.registerForm.patchValue({ role_id: '2' });
    this.modalRef = this.modalService.show(template,this.config);
  }

  login() {
    if (this.loginForm.valid) {
      this.authRestService
        .postApiWitoutToken(AppApi.loginUrl, this.loginForm.value)
        .then((response) => {
          if (response.status === 1 && response.code === 201) {
            this.currentUserService.setVerifiedUser(response);
            this.loginForm.reset();
            this.modalRef.hide();
            if (response.data.role_id == 2) {
              this.router.navigate(['/job-listing']);
            } else {
              this.router.navigate(['/employer-dashboard']);
            }
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
        })

    } else {
      this.currentUserService.validateAllFormFields(this.loginForm);
    }
  }

  loginModalOpen(content) {
    this.modalRef.hide();
    this.modalService.show(content,this.config);
  }



  forgetPasswordForm() {
    if (this.forgetForm.valid) {
      this.authRestService
        .postApiWitoutToken(AppApi.forgetUrl, this.forgetForm.value)
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
        })

    } else {
      this.currentUserService.validateAllFormFields(this.forgetForm);
    }
  }


/**close popup */
  closeModel(){
    this.modalRef.hide();
    this.forgetForm.reset();
    this.registerForm.reset();
  }

  /**
* Validate the password and confirm password
* @param formGroup form group
*/
  validateConfirmPassword(registerForm) {
    if (registerForm.value.password !== '' && registerForm.value.confirmPassword !== '') {
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        registerForm.controls.confirmPassword.setErrors({
          passwordMismatch: true
        });
      } else {
        registerForm.controls.confirmPassword.setErrors(null);
      }
    }
  }
}