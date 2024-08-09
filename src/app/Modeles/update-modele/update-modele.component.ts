import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modele',
  templateUrl: './update-modele.component.html',
  styleUrls: ['./update-modele.component.css']
})
export class UpdateModeleComponent implements OnInit{
  modele:Modele = new Modele() ;
  id: number = 0;

  constructor(private service:ModeleService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.id = this.sniper.snapshot.params['id'];
    this.service.getModeleById(this.id).subscribe({
      next : (res) => {
        this.modele = res;
      },
      error : (error) =>{
        console.error('error fetching Modele with code id :' +this.id, error);
      }
    })
  }
  updateModele(): void {
    this.service.updateModel(this.id, this.modele).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Succès!',
          text: 'Modèle mis à jour avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['admin/Modele/list-modele']);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du modèle avec id : ' + this.id);
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur lors de la mise à jour du modèle!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

