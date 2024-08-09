import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modul } from 'src/app/models/modul';
import { ModulService } from 'src/app/services/modul.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent {

  module:Modul = new Modul() ;
  cdModul:String="";

  constructor(private service:ModulService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.cdModul = this.sniper.snapshot.params['cdModul'];
    this.service.getByCdModul(this.cdModul).subscribe({
      next : (res) => {
        console.log();
        this.module = res;
      },
      error : (error) =>{
        console.error('error fetching module with code :' +this.cdModul, error);
      }
    })
  }
  updateModule():void{
    this.service.updateModule(this.cdModul,this.module).subscribe({
      next: (res) => {
        Swal.fire({
            title: 'Succès!',
            text: 'Les informations de cet module ont été mises à jour avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                this.router.navigate(['admin/list-modules']);
            }
        });
    },
    error: (error) => {
        console.error('Erreur lors de la mise à jour de module avec code : ' + this.cdModul, error);
        Swal.fire({
            title: 'Erreur!',
            text: 'Échec de la mise à jour des informations de module.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
}
}

