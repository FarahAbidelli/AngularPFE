import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modul } from 'src/app/models/modul';
import { ModulService } from 'src/app/services/modul.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent {

  module : Modul = new Modul();
  constructor (private service:ModulService, private router:Router){}
  ngOnInit(): void { 

}
create(): void {
  this.service.addModule(this.module).subscribe({
    next: (data) => {
      Swal.fire({
        title: 'Succès!',
        text: 'Le module a été ajouté avec succès.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/admin/list-modules"]);
        }
      });
    },
    error: (err) => {
      console.log(err);
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de l\'ajout du module.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Fermer'
      });
    }
  });
}
}

