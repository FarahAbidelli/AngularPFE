import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  roles: Roles[] = [];
  user: User = new User();
  userId: number = 0;
  users: User[] = [];

  constructor(private roleService: RoleService,
              private service: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.loadUser(this.userId);
    this.loadRoles();
  }

  loadUser(userId: number): void {
    this.service.getByUserId(userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(
      (data: Roles[]) => {
        this.roles = data.map(role => ({ ...role, selected: false }));
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  submitForm(): void {
    const selectedRoles = this.roles.filter(role => role.selected);
    this.service.assignRolesToUser(this.userId, selectedRoles).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Role Affecté avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
        this.loadUser(this.userId); // Recharger les détails de l'utilisateur après l'affectation des rôles
        this.roles.forEach(role => role.selected = false);
      },
      error: (error) => {
        console.error('Error assigning roles:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error assigning roles. Please try again later.'
        });
      }
    });
  }
  deleteRole(userId: number, roleId: number): void {
    this.service.deleteRoleUser(userId, roleId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Role deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        // Rechargez les données de l'utilisateur après la suppression du rôle
        this.loadUser(userId);
      },
      error: (error) => {
        console.error('Error deleting role:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error deleting role. Please try again later.'
        });
      }
    });
  }
}
