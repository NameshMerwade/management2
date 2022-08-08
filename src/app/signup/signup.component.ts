import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: any = FormBuilder;
  responseMessage: any;
  formGroup: any




  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userServices: userService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  handleSubmit() {
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.userServices.signup(data).subscribe((response: any) => {
      this.responseMessage = alert('Successfully registered');
      this.router.navigate(['/login']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message(alert('Email already Exist.'));
      }
      else {
        this.responseMessage = "Something went Wrong. Please try again later";
      }
      this.responseMessage = "Error";
    })
  }


}
