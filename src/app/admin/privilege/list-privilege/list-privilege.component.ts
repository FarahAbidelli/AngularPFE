import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Privilege } from 'src/app/models/privilege';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-list-privilege',
  templateUrl: './list-privilege.component.html',
  styleUrls: ['./list-privilege.component.css']
})
export class ListPrivilegeComponent implements OnInit{
  p: number = 1;
  itemsPerPage : number =5;
  totalModules:any;
  searchtext:any; 

  privileges : Privilege[]=[];
  constructor( private service : PrivilegeService,
               private router : Router
  ){}
  ngOnInit(): void {
    this.loadPrivilege();
  }
loadPrivilege():void{
  this.service.getPrivilege().subscribe({
    next: (data)=>{
    this.privileges=data;
    this.totalModules=data.length;
  },
   error: (Error)=>{
    console.log(Error);
   }
}
)
}
}
