import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Modul } from 'src/app/models/modul';
import { MenuService } from 'src/app/services/menu.service';
import { ModulService } from 'src/app/services/modul.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit{
  menu : Menu = new Menu();
  module : Modul [] = [];
  constructor (private mservice:ModulService,private service:MenuService, private router:Router){}
  ngOnInit(): void { 
    this.mservice.getModules().subscribe({
      next : (data)=>{
        this.module = data;
      },
      error: (error) =>{
        console.log(error);
    }
   })
  }
  create():void{
    console.log("Creating menu with:", this.module);
    this.service.addMenu(this.menu).subscribe({
      next :(data) => {
       this.router.navigate(["admin/list-menu"]);
      },
       error:(err) => {
        console.log(err);
      } 
    });
  }
}
