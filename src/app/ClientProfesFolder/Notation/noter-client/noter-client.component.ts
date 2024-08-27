// src/app/components/noter-client/noter-client.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import { VariableService } from 'src/app/services/variable.service';
import { NotationService } from 'src/app/services/notation.service';
import { Client } from 'src/app/models/client';
import { Variable } from 'src/app/models/variable';
import { Notation } from 'src/app/models/notation';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-noter-client',
  templateUrl: './noter-client.component.html',
  styleUrls: ['./noter-client.component.css']
})
export class NoterClientComponent implements OnInit{


  clients: Client[] = [];
  variables: Variable[] = []; // Liste des questions (variables)

  constructor(
    private clientService: ClientProfesService,
    private variableService: VariableService,
    private notationService: NotationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadVariables();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  loadVariables(): void {
    this.variableService.getAllVariables().subscribe(data => {
      this.variables = data;
    });
  }

  noterClient(clientId: number): void {
    const newNotation = new Notation(
      0,
      clientId,
      this.variables,
      {},
      'en cours'
    );

    Swal.fire({
      title: 'Noter le client',
      html: this.createFormHtml(newNotation),
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
     /* preConfirm: () => this.submitNotation(newNotation)*/
    });
  }

  createFormHtml(notation: Notation): string {
    return this.variables.map(variable => `
      <div>
        <label>${variable.description}</label>
        <input type="number" id="variable-${variable.id}" class="swal2-input" />
      </div>
    `).join('');
  }

  /*submitNotation(notation: Notation): void {
    this.variables.forEach(variable => {
      const score = (document.getElementById(`variable-${variable.id}`) as HTMLInputElement).value;
      notation.scores[variable.id] = +score;
    });

    this.notationService.createNotation(notation).subscribe({
      next: () => Swal.fire('Succès', 'Notation enregistrée!', 'success'),
      error: error => Swal.fire('Erreur', `Erreur lors de l'enregistrement: ${error.message}`, 'error')
    });
  }*/
}

