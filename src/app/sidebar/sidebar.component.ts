import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  username: any = '';
 
  firstName: any = '';
  lastName: any = '';
  idUser: any = '';
  token: any = '';
  role: any ='';
  constructor(private _router: Router) { }

  ngOnInit(): void {
  
    this.username = localStorage.getItem('username');
   
    console.log(this.username)
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    console.log(this.lastName)
    console.log(this.firstName)
    this.idUser = localStorage.getItem('_id');

    this.role = localStorage.getItem('role');
    console.log(this.firstName)
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/sign-in']);
  }

}
