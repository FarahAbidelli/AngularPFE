import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-privilege',
  templateUrl: './update-privilege.component.html',
  styleUrls: ['./update-privilege.component.css']
})
export class UpdatePrivilegeComponent implements OnInit {
    privilege: Privilege = new Privilege();
    roles: Roles[] = [];
    menus: Menu[] = [];
    roleId: number=0;
    menuId: string='';
    privilegeId: number=0;
  
    constructor(
      private privilegeService: PrivilegeService,
      private menuService: MenuService,
      private roleService: RoleService,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.privilegeId = +this.route.snapshot.params['id'];
      this.loadPrivilege();
      this.loadRoles();
      this.loadMenus();
    }
  
    loadPrivilege(): void {
      this.privilegeService.getPrivilegeById(this.privilegeId).subscribe({
        next: (privilege) => {
          this.privilege = privilege;
          this.roleId = privilege.role.id;
          this.menuId = privilege.menu.cdMenu;
        },
        error: (error) => {
          console.error('Error fetching privilege', error);
        }
      });
    }
  
    loadRoles(): void {
      this.roleService.getRoles().subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: (error) => {
          console.error('Error fetching roles', error);
        }
      });
    }
  
    loadMenus(): void {
      this.menuService.getMenus().subscribe({
        next: (menus) => {
          this.menus = menus;
          console.log(this.menus)
        },
        error: (error) => {
          console.error('Error fetching menus', error);
        }
      });
    }
  
    updatePrivilege(): void {
      this.privilegeService.updatePrivilege(this.privilegeId, this.roleId, this.menuId, this.privilege).subscribe({
        next: () => {
          Swal.fire('Success', 'Privilege updated successfully', 'success');
          this.router.navigate(['/admin/list-privilege']);
        },
        error: (error) => {
          console.error('Error updating privilege', error);
          Swal.fire('Error', 'There was an error updating the privilege', 'error');
        }
      });
    }
  }