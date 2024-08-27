import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from 'src/app/models/variable';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-variable',
  templateUrl: './list-variable.component.html',
  styleUrls: ['./list-variable.component.css']
})
export class ListVariableComponent implements OnInit {
  p: number = 1;
  itemsPerPage : number =5;
  totalModules:any;
  searchtext:any;

  variables : Variable[]=[];
  constructor( private service : VariableService,
               private router : Router
  ){}
  ngOnInit(): void {
    this.loadVariable();
  }
  loadVariable():void{
  this.service.getAllVariables().subscribe({
    next: (data)=>{
    this.variables=data;
    this.totalModules=data.length;
  },
   error: (Error)=>{
    console.log(Error);
   }
}
)
}
ajouterScore(id:any):void {
  this.router.navigate(['/admin/Score/add-score/',id]);
}
ConsulterScoresVariable(id:any):void {
  this.router.navigate(['/admin/Variable/ConsulterScoresVariable',id]);
}
deleteVariable(id: any): void {

  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous êtes sur le point de supprimer cette Question !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, annuler!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteVariable(id).subscribe({

        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'Menu a été supprimé.',
            'success'
          );
          this.loadVariable();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la menu :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de Question a échoué.',
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
}
