import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { PrivilegeService } from 'src/app/services/privilege.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-privilege-with-role',
  templateUrl: './list-privilege-with-role.component.html',
  styleUrls: ['./list-privilege-with-role.component.css']
})
export class ListPrivilegeWithRoleComponent implements OnInit{
  p: number = 1;
  itemsPerPage: number = 5;
  totalModules: any;
  searchtext: any; 
  roles: Roles[] = [];
  roleId: number = 0;

  privileges: Privilege[] = [];

  constructor(private service: PrivilegeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roleId = params['roleId'];
      this.loadPrivilege(this.roleId);
    });
  }
  
  loadPrivilege(roleId: number): void {
    this.service.getPrivilegeWithRole(roleId)
      .subscribe(
        data => {
          this.privileges = data;
          console.log('Résultat de loadPrivilegesByRole :', this.privileges);
        },
        error => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
  }
  deletePrivilege(id: any): void {
 
    // Afficher un Sweet Alert pour demander confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de supprimer cette privilége !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePrivilege(id).subscribe({
          
          next: (res) => {
            Swal.fire(
              'Supprimé!',
              'Menu a été supprimé.',
              'success'
            );
            this.loadPrivilege(this.roleId); 
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de privilége :', error);
            Swal.fire(
              'Échec de la suppression!',
              'La suppression de privilége a échoué.',
              'error'
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'La suppression a été annulée',
          'error'
        );
      }
    });
  }
  updatePrivilege(id:any):void{
    this.router.navigate(['update-privilege',id]);
  }
}
