import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from 'src/app/models/variable';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';
import { Type } from 'src/app/models/type.enum';
import { Response } from 'src/app/models/response';
@Component({
  selector: 'app-noter-client-form',
  templateUrl: './noter-client-form.component.html',
  styleUrls: ['./noter-client-form.component.css']
})
export class NoterClientFormComponent implements OnInit{
  variables : Variable[] = [];
  totalModules:any;
  p: number = 1;
  itemsPerPage : number =5;
  searchtext:any;
  Type = Type;
  responses : Response[] = [];
  clientId: number | undefined;


  constructor(private route: ActivatedRoute, private service: VariableService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
    this.loadVariable();
    });
  }

  loadVariable():void{
    this.service.getAllVariablesId(this.clientId).subscribe({
      next: (data)=>{
      this.variables=data;
      this.totalModules=data.length;
      this.responses = this.variables.map(variable => new Response(variable.id, variable.response));
    },
     error: (Error)=>{
      console.log(Error);
     }
  }
  )
  }

  getResponseByVariableId(variableId: any): any {
    console.log(this.responses);
    return this.responses.find(response => response.variableId === variableId);
  }
  /*submitResponse(): void {
    const response = { responses: this.responses, status: "DONE" };
    this.service.sendResponses(response).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: `Vous avez obtenu la note de  : ${data.note}`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/admin/list-notation"]);
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la soumission de la réponse :', error);
      }

    });
  }*/


    /*submitResponse(): void {
      // Vérifie si toutes les réponses sont remplies
      const incompleteResponses = this.responses.some(response => !response.response);

      if (incompleteResponses) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Veuillez remplir toutes les réponses avant de soumettre le formulaire.',
          showConfirmButton: true
        });
        return; // Arrête l'exécution si le formulaire n'est pas complet
      }

      const response = { responses: this.responses, status: "DONE" };
      this.service.sendResponses(response).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: `Vous avez obtenu la note de : ${data.note}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(["/admin/list-notation"]);
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la soumission de la réponse :', error);
        }
      });
    }*/

  submitResponse() : any {
    const response = {responses : this.responses, status : "DONE"}
    return this.service.sendResponses(response,this.clientId).subscribe({
      next: (data)=>{

      Swal.fire(
        "VOTRE NOTE EST :  "+ data.note
      );

    },
     error: (Error)=>{
      console.log(Error);
     }
  })}

  submitResponseSave() : any {
    const response = {responses : this.responses, status : "IN_PROGRESS"}
    return this.service.saveResponses(response,this.clientId).subscribe({
      next: (data)=>{

      Swal.fire(
        "Votre réponse a été enregistrée."
      );

    },
     error: (Error)=>{
      console.log(Error);
     }
  })}
  /*submitResponseSave(): void {
    const response = { responses: this.responses, status: "IN_PROGRESS" };
    this.service.saveResponses(response).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré!',
          text: 'Les réponses ont été enregistrées avec succès.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/admin/list-notation"]);
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de l\'enregistrement des réponses :', error);
      }
    });
  }*/
}
