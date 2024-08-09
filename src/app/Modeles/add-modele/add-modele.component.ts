import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modele',
  templateUrl: './add-modele.component.html',
  styleUrls: ['./add-modele.component.css']
})
export class AddModeleComponent implements OnInit{
  modele: Modele = new Modele();

  constructor(private service: ModeleService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.addModele(this.modele).subscribe({
      
      next: (data) => {
       
        Swal.fire({
          icon: 'success', 
          title: 'Succès', 
          text: 'Modèle ajouté avec succès !', 
        }).then(() => {
          this.router.navigate(['/admin/Modele/list-modele']); 
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error', 
          text: 'Échec de l\'ajout du modèle !', 
        });
        console.log(err); 
      },
    });
  }
}