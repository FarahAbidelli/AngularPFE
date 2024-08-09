import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit{
  roles  : Roles[] = [];
  p: number = 1;
  itemsPerPage : number =5;
  totalUsers:any;
  searchtext:any;
  constructor(private service:RoleService,
    private router:Router){}
    ngOnInit(): void {

      this.service.getRoles().subscribe({
        next: (data) =>{
          this.roles= data ;
          this.totalUsers=data.length;
        
        },
        error : (Error) =>{
          console.log(Error);
        }
      });
    }
    updateRole(id:any):void{
      this.router.navigate(['/update-role',id]);
    }
    
}
