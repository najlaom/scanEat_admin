import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin: any = {}
  myForm: FormGroup;
  constructor(private adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router) {
    this.myForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    });
  }

  ngOnInit(): void {
  }

  login(email: any, password: any) {
    this.adminService.login(email.value, password.value).subscribe(
      (data) => {
        console.log(data)
        if (data) {
          this.admin = data
        
          localStorage.setItem("token", this.admin.token);

       
        
          localStorage.setItem("email", this.admin.admin.email);
          localStorage.setItem("username", this.admin.admin.username);
          localStorage.setItem("firstName", this.admin.admin.firstName);
          localStorage.setItem("lastName", this.admin.admin.lastName);
          localStorage.setItem("role", this.admin.admin.role);
          localStorage.setItem("_id", this.admin.admin._id);
         
          this._router.navigate(['./users']);
           console.log(data)
        }
        
      },
      error => {
        console.log(error)
      });
  }

  movetoregister() {
    this._router.navigate(['/register'], { relativeTo: this._activatedRoute });
  }
}
