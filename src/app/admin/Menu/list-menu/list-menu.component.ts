import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent{

  menus  : Menu[] = [];
  p: number = 1;
  itemsPerPage : number =5;
  totalModules:any;
  searchtext:any;
constructor(private service:MenuService,
            private router:Router){}

ngOnInit(): void {
  this.loadMenu();
}
loadMenu():void{
  this.service.getAllMenus().subscribe({
    next: (data) =>{
      this.menus = data ;
      this.totalModules=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
deleteModule(cdMenu: any): void {
 
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
      this.service.deleteMenu(cdMenu).subscribe({
        
        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'Menu a été supprimé.',
            'success'
          );
          this.loadMenu(); // Recharger la liste des utilisateurs
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la menu :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de menu a échoué. car elle est affecter à un module',
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

