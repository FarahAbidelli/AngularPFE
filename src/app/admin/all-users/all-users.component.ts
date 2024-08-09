import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users  : User[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
constructor(private service:UserService,
            private dialogService: DialogServiceService,
            private router:Router){}

ngOnInit(): void {

  this.service.getUsers().subscribe({
    next: (data) =>{
      this.users = data ;
      this.totalUsers=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
consulterPermissions(id: number) {
  this.router.navigate(['/permission', id]);
}
}
