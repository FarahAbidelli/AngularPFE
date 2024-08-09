import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corbeille-modele',
  templateUrl: './corbeille-modele.component.html',
  styleUrls: ['./corbeille-modele.component.css']
})
export class CorbeilleModeleComponent implements OnInit {
  modele: Modele[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  totalUsers: any;
  searchtext: any;
  searched: boolean = false;
  exists: boolean = false;
  notExists: boolean = false;

  constructor(private service: ModeleService, private router: Router) {}

  ngOnInit(): void {
    this.loadModeleSoftDelete();
    
  }

  loadModeleSoftDelete(): void {
    this.service.getSoftDeleteModels().subscribe({
      next: (data) => {
        this.modele = data;
        this.totalUsers = data.length;
      },
      error: (Error) => {
        console.log(Error);
      }
    });
  }
  restoreModele(id: any): void {
    this.service.restoreModele(id).subscribe({
      next: (res) => {
        Swal.fire(
          'Restauré!',
          'Le modèle a été restauré avec succès.',
          'success'
        );
        this.loadModeleSoftDelete();
      },
      error: (error) => {
        console.error('Erreur lors de la restauration du modèle :', error);
        Swal.fire(
          'Échec de la restauration!',
          'La restauration du modèle a échoué. ' + error.message,
          'error'
        );
      },
    });
}
}
