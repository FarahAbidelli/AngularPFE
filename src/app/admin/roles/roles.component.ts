import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  roles  : Roles[] = [];
  p: number = 1;
  itemsPerPage : number =5;
  totalUsers:any;
  searchtext:any;
  constructor(private service:RoleService,
    private router:Router){}
    ngOnInit(): void {
      this.loadRole();
    }
    loadRole():void{
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
    deleteRole(id: any): void {
 
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous êtes sur le point de supprimer cet module !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, annuler!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteRole(id).subscribe({
            
            next: (res) => {
              Swal.fire(
                'Supprimé!',
                'Menu a été supprimé.',
                'success'
              );
              this.loadRole(); 
            },
            error: (error) => {
              console.error('Erreur lors de la suppression de role :', error);
              Swal.fire(
                'Échec de la suppression!',
                'La suppression de role a échoué. car elle est affecter à un utilisateur',
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
    
}
