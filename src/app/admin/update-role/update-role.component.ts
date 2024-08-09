import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {
  role:Roles = new Roles() ;
  roleId:number = 0;

  constructor(private service:RoleService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.roleId = this.sniper.snapshot.params['id'];
    this.service.getRoleId(this.roleId).subscribe({
      next : (res) => {
        this.role = res;
      },
      error : (error) =>{
        console.error('error fetching product with id :' +this.roleId, error);
      }
    })
  }
  updateRole(): void {
    this.service.updateRole(this.roleId, this.role).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Le rôle a été mis à jour avec succès.',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['admin/roles']);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rôle : ', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de la mise à jour du rôle. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
}
