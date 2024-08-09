import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.css'],
})
export class ListModeleComponent implements OnInit {
  modele: Modele[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  totalUsers: any;
  searchtext: any;
  searched: boolean = false;
  codeRelation: any;
  exists: boolean = false;
  notExists: boolean = false;
  maDate: Date = new Date();

  constructor(private service: ModeleService, private router: Router) {}

  ngOnInit(): void {
    this.loadModele();
  }

  loadModele(): void {
    this.service.getModeles().subscribe({
      next: (data) => {
        this.modele = data;
        this.totalUsers = data.length;
      },
      error: (Error) => {
        console.log(Error);
      }
    });
  }

  deleteModele(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de supprimer cet client!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteModele(id).subscribe({
          next: (res) => {
            Swal.fire('Supprimé!', 'Le modele a été supprimé.', 'success');
            this.removeModeleFromList(id); 
            //this.router.navigate(['/admin/Modele/corbeille-modele']); 
        
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de Modèle :', error);
            Swal.fire(
              'Échec de la suppression!',
              'La suppression de Modèle a échoué. ' + error.message,
              'error'
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'La suppression a été annulée', 'error');
      }
    });
  }

  removeModeleFromList(id: number): void {
    this.modele = this.modele.filter(m => m.id !== id);
  }

  updateModele(id:any):void{
    this.router.navigate(['/admin/Modele/update-modele',id]);
  }

}
