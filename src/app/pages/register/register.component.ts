import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  successMessage = '';
  admin: any = {}
  myForm: FormGroup;
  constructor(
    private adminService: AdminService,
    private _router: Router,
    private fb: FormBuilder
  ) { 
    this.myForm = this.fb.group({

      
      firstName :  new FormControl('', [Validators.required]),
      lastName :  new FormControl('', [Validators.required]),
      email :  new FormControl('', [Validators.required, Validators.email]),
      username :  new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    
    })
  }

  ngOnInit(): void {
  }
  registerAdmin(firstName: any, lastName: any, email: any, username: any, password: any) {
    this.adminService.register(firstName.value, lastName.value, email.value, username.value, password.value).subscribe(
      (data) => {
      console.log(data)
      this.admin = data
     
      localStorage.setItem("email", this.admin.user.email)
      localStorage.setItem("firstName", this.admin.user.firstName)
      localStorage.setItem("lastName", this.admin.user.lastName)
      localStorage.setItem("username", this.admin.user.username)
      localStorage.setItem("role", this.admin.user.date_create_admin)
      localStorage.setItem("role", this.admin.user.role)
      localStorage.setItem("_id", this.admin.user._id)
      this._router.navigate(['./dashboard']);
      
    },
    error => {
        console.log(error)
    });
  }


}
