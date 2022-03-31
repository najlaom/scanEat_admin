import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/espace-client/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  successMessage = '';
  submitted = false;
  user: any = {}
  myForm: FormGroup;
  fileToUpload: File = null;
  imageUrl: string = '';
  constructor(private apiUserService: UsersService,
    private _router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.myForm = this.fb.group({

      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  

    })
  }

  ngOnInit(): void {
  }
  //////////////////Image
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  registerUser(firstName, lastName, email, username, password, image) {

    this.apiUserService.addUser(firstName.value, lastName.value, email.value, username.value,
      password.value, this.fileToUpload).subscribe(
        (res) => {
          firstName.value = null;
          lastName.value = null;
          email.value = null;
          username.value = null;
          password.value = null;
          image.value = null;
         

        this._router.navigate(['/users']);



        }, (error) => {
          if (error.status == 400) {
            console.log({ error: error })

          }
          if (error.status == 500) {
            console.log({ error })
          }

        });
  }

  addClient() {

    console.log("this.product add prod")
    console.log(this.user)
    if (this.myForm.invalid) {
      return;
    }
    const formData: any = new FormData();

    formData.append("logoImage", this.fileToUpload, this.fileToUpload['name']);
    for (var key in this.user) {
      formData.append(key, this.user[key]);
    }

    this.apiUserService.addClient(formData).subscribe(
      (data) => {
        console.log("addClient : ");
        console.log(data);
        this.user = data
        this.submitted = true;
        

       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value, null, 4));
        //this._router.navigateByUrl('/users', { skipLocationChange: true })
        console.log('dddddddddemail')

        localStorage.setItem("lastName", this.user.data.lastName);
        localStorage.getItem('lastName')
        console.log(localStorage.getItem('lastName'))

      },
      error => {
        console.log("error")
        console.log(error)
        alert(error.error)
      });
  }


}
