import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CurrentUserService } from "../../../common/services/user/current-user.service"
import { CustomValidators } from "../../../common/directive/custom-validator.directive";
import { AuthRestService } from 'src/app/common/services/auth/auth-rest.service';
import { AppApi } from "../../../../app/app-api";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup
  constructor(
    public currentUserService: CurrentUserService,
    public authRestService: AuthRestService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, CustomValidators.vaildEmail]),
      subject: new FormControl("", [Validators.required]),
      message: new FormControl("", [Validators.required]),
    });
  }


  contactFormSubmit(){
    if(this.contactForm.valid){
      Swal.fire({
        title: 'Query Successfully Submited',
        icon: 'success',
        timer: 5000,
        position: "top-right",
        toast: true,
        showCancelButton: false,
        showConfirmButton: false
      });
      this.contactForm.reset();
    }else{
      this.currentUserService.validateAllFormFields(this.contactForm);
    }
  }
}
