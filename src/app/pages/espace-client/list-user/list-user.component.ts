import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/espace-client/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listUsers: any = []

  constructor(private userService: UsersService) { }

  async ngOnInit(){
    await this.getUsers();
  }

  getUsers() {
    
    this.userService.getUsers().then(
      (data: any) => {
        if (data) {
          this.listUsers = data;
          console.log("datacccccccccc")
          console.log(data)
        }
       
        console.log(data)
        
      }
    )
  }

}
