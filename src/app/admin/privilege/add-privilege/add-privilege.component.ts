import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.css']
})
export class AddPrivilegeComponent implements OnInit{
  privileges = new Privilege();
  roles : Roles[]=[];
  menus : Menu[]=[];
  roleId: number=0;
  menuId: string='';
  constructor(private mservice:MenuService,
              private rservice:RoleService,
              private service:PrivilegeService,
              private router:Router
  ){}
ngOnInit(): void {
  this.mservice.getMenus().subscribe({
    next : (data)=>{
      this.menus = data;
      console.log(this.menus);

    },
    error : (Error)=>{
      console.log(Error);
    }
  });
  this.rservice.getRoles().subscribe({
    next : (data)=>{
      this.roles = data;
      console.log(this.roles);

    },
    error : (Error)=>{
      console.log(Error);
    }
  });
}
create(): void {
  if (this.roleId == null || this.menuId == null) {
    console.error('Les valeurs de roleId ou menuId sont nulles.');
    return;
  }
  console.log('Envoi des données :', this.roleId, this.menuId);
  this.service.addPrivilege(this.roleId, this.menuId)
    .subscribe(
      response => {
        console.log('Privilege ajouté avec succès :', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Privilege ajouté avec succès!',
          showConfirmButton: false,
          timer: 1500 // Ferme automatiquement après 1.5 secondes
        });
        this.router.navigate(["/admin/list-privilege"]);
      },
      error => {
        console.error('Une erreur s\'est produite :', error);
      }
    );
}



}
