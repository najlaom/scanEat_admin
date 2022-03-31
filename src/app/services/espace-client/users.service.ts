import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

 
  addUser(name: any, lastName: any, email: any, username: any, password: any,
    fileToUpload: File): Observable<any> {

    var formData: FormData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("LogoImage", fileToUpload, fileToUpload.name);



    return this.http.post(environment.apiRegisterUser, formData,
      {
        reportProgress: true,
        observe: 'events'
      })
  }
  addClient(user: any) {

    return this.http.post(environment.apiRegisterUser,
      user);
  }

  
  getUsers() {
    let url = `${environment.apiListUsers}`;
    return new Promise((slv) => {
      this.http.post(url, { headers: this.headers })
        .subscribe((data: any) => {
          console.log("getProducts : ")
          console.log(data)
          if (data && data.success && data.result) {
            slv(data.result)
          } else slv(false)
        },
          (error) => {
            slv(false)
          });
    })
  }

}
