import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  register(firstName: any, lastName: any, email: any, username: any, password: any) {
    return this.http.post(environment.apiRegisterAdmin,
      {
        
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "username": username,
        "password": password,
      });
  }

  login(email: any, password: any) {
    return this.http.post(environment.apiLoginAdmin,
      {
        "email": email,
        "password": password
      });
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  // logout(admin :any) {
  //   return this.http.post(environment.apiLogoutAdmin,
  //     admin);
  // }

}
