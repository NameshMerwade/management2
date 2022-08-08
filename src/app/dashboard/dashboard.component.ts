import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { userService } from '../service/user.service';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { UserModel } from './dashboarduser.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = 'https://nodejs8888.azurewebsites.net';

  formValue !: FormGroup;
  UserModelObj: UserModel = new UserModel();
  responseMessage: any;
  data: any;
  ngAfterViewInit() { }

  constructor(private HttpClient: HttpClient,
    private router: Router,
    private userServices: userService,
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userServices.checkToken().subscribe((response: any) => {
        this.router.navigate(['/dashboard']);
      }, (error: any) => {
        console.log(error);
      })
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  };

}
