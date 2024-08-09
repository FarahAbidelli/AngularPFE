import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { situationClientProfes } from 'src/app/models/situationClientProfes';
import { SituationProfesService } from './../../../services/situationProfesService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-situationl-csv',
  templateUrl: './upload-situationl-csv.component.html',
  styleUrls: ['./upload-situationl-csv.component.css']
})
export class UploadSituationlCsvComponent {
  selectedFile: File | undefined;

  constructor(private situationProfesService: SituationProfesService, private router: Router) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    this.situationProfesService.uploadSituations(this.selectedFile).subscribe(
      (numberOfClientsAdded) => {
        console.log('Fichier ajouté avec succès. Nombre de situation ajoutés :', numberOfClientsAdded);
        Swal.fire({
          title: 'Succès !',
          text: `Fichier ajouté avec succès.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            //this.router.navigate(['/admin/list-client']);
          }
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du fichier :', error);
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de l\'ajout du fichier.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}
