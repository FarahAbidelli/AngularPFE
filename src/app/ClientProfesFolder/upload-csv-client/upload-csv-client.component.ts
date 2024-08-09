import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ClientProfes } from 'src/app/models/clientProfes';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-csv-client',
  templateUrl: './upload-csv-client.component.html',
  styleUrls: ['./upload-csv-client.component.css']
})
export class UploadCsvClientComponent {
  selectedFile: File | undefined;

  constructor(private clientProfesService: ClientProfesService, private router: Router) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    this.clientProfesService.uploadClients(this.selectedFile).subscribe(
      (numberOfClientsAdded) => {
        console.log('Fichier ajouté avec succès. Nombre de clients ajoutés :', numberOfClientsAdded);
        Swal.fire({
          title: 'Succès !',
          text: `Fichier ajouté avec succès.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/list-client']);
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
