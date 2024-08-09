import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  users  : User[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
constructor(private service:UserService,
            private router:Router){}

ngOnInit(): void {
  this.loadUser();
}
loadUser():void{
  this.service.getUsers().subscribe({
    next: (data) =>{
      this.users = data ;
      this.totalUsers=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
deleteUser(id: any): void {
  // Afficher un Sweet Alert pour demander confirmation
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous êtes sur le point de supprimer cet utilisateur!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, annuler!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme, appeler le service de suppression
      this.service.deleteUser(id).subscribe({
        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'L’utilisateur a été supprimé.',
            'success'
          );
          this.loadUser(); // Recharger la liste des utilisateurs
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l’utilisateur :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de l’utilisateur a échoué. ' + error.message,
            'error'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Si l'utilisateur annule, afficher un message d'annulation
      Swal.fire(
        'Annulé',
        'La suppression a été annulée',
        'error'
      );
    }
  });
}
updateUser(id:any):void{
  this.router.navigate(['/update-user',id]);
}

}
