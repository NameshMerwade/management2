import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'https://nodejs8888.azurewebsites.net';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  getDetails() {
    return this.httpClient.get(this.url + "/user/get")
  }

}
