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
  idAdmin: any = "";
  constructor(private apiUserService: UsersService,
    private _router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.myForm = this.fb.group({

      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      logo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),


    })
  }

  ngOnInit(): void {
    this.idAdmin = localStorage.getItem('_id');
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

  addClient(first_name, last_name, email, password, logo, num_tel, adresse) {
    if (first_name.value != "" && last_name.value != "" && email.value != ""  && password.value != "" 
    && logo.value != ""  && num_tel.value != "" && adresse.value != "" && this.imageUrl != "") {

      const formData: any = new FormData();

      formData.append("LogoImage", this.fileToUpload, this.fileToUpload['name']);

      var client = {
        firstName: first_name.value,
        lastName: last_name.value,
        email: email.value,
        password: password.value,
        logo: logo.value,
        num_tel: num_tel.value,
        adresse: adresse.value,
        manager: this.idAdmin
      }
      console.log(client)
      for (var key in client) {
        formData.append(key, client[key]);
      }

      // if (true) {
      if (confirm('Etes vous sûre?')) {
        this.apiUserService.registerClient(formData).then((res: any) => {
          // console.log("ressssss add cat : ")
          // console.log(res)
          if (res == true) {
            this._router.navigate(['./espace-clients']);
            // location.href = '/products';
            console.log(res)
          } else {
            alert(res.msg);
          }
        });
      }
    } else {
      alert('Catégorie est invalide');
    }
  }




}
