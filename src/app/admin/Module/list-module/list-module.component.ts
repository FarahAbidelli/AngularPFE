import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modul } from 'src/app/models/modul';
import { ModulService } from 'src/app/services/modul.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.css']
})
export class ListModuleComponent implements OnInit{
  modules  : Modul[] = [];
  p: number = 1;
  itemsPerPage : number =5;
  totalModules:any;
  searchtext:any;
constructor(private service:ModulService,
            private router:Router){}

ngOnInit(): void {
  this.loadUser();
}
loadUser():void{
  this.service.getModules().subscribe({
    next: (data) =>{
      this.modules = data ;
      this.totalModules=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
deleteModule(cdModul: any): void {
 
  // Afficher un Sweet Alert pour demander confirmation
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
      // Si l'utilisateur confirme, appeler le service de suppression
      this.service.deleteModule(cdModul).subscribe({
        
        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'Module a été supprimé.',
            'success'
          );
          this.loadUser(); // Recharger la liste des utilisateurs
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la module :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de module a échoué. car elle est affecter à un Menu',
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
updateModule(cdModul:any):void{
  this.router.navigate(['/update-module',cdModul]);
}

}

