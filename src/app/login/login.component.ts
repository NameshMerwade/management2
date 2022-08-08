import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  responseMessage: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userServices: userService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: [null, [Validators.required]]
    })

  }



  handleSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userServices.login(data).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.responseMessage = alert('Successfully logged In.');
      this.router.navigate(['/dashboard']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message(alert('Please check email and password.'));
      }
      else {
        this.responseMessage = "Something went Wrong. Please try again later";
      }
      this.responseMessage = "Error";
    })
  }


}
