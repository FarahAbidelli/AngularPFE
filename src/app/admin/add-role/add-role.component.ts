import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit{
  role : Roles = new Roles();
  constructor (private service:RoleService, private router:Router){}
  ngOnInit(): void { 

}
create():void{
  this.service.addRole(this.role).subscribe({
    next :(data) => {
      this.router.navigate(["/admin/roles"]);
    },
     error:(err) => {
      console.log(err);
    } 
  });
}
}
