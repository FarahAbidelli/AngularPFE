import { Variable } from './../../../models/variable';
import { Notation } from './../../../models/notation';
import { Component, OnInit } from '@angular/core';
import { VariableService } from 'src/app/services/variable.service';
import { NotationService } from 'src/app/services/notation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-notation',
  templateUrl: './modifier-notation.component.html',
  styleUrls: ['./modifier-notation.component.css']
})
export class ModifierNotationComponent implements OnInit {
  notations: any[] = [];
  variables: Variable[] = [];

  constructor(
    private variableService: VariableService,
    private notationService: NotationService
  ) {}

  ngOnInit(): void {
    this.loadNotations();
    this.loadVariables();
  }

  loadNotations(): void {
    this.variableService.getInProgress().subscribe(data => {
      this.notations = data;
      console.log(this.notations);
    });
  }

  loadVariables(): void {
    this.variableService.getAllVariables().subscribe(data => {
      this.variables = data;
    });
  }

  /*onEditNotation(notation: Notation): void {
    Swal.fire({
      title: 'Modifier Notation',
      html: this.createFormHtml(notation),
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      preConfirm: () => this.submitModification(notation)
    });
  }

  createFormHtml(notation: Notation): string {
    return this.variables.map(variable => `
      <div>
        <label>${variable.description}</label>
        <input type="number" id="variable-${variable.id}" class="swal2-input" value="${notation.scores[variable.id] || ''}" />
      </div>
    `).join('');
  }*/

  /*submitModification(notation: Notation): void {
    this.variables.forEach(variable => {
      const score = (document.getElementById(`variable-${variable.id}`) as HTMLInputElement).value;
      notation.scores[variable.id] = +score;
    });

    this.notationService.updateNotation(notation).subscribe({
      next: () => Swal.fire('Succès', 'Notation modifiée!', 'success'),
      error: error => Swal.fire('Erreur', `Erreur lors de la modification: ${error.message}`, 'error')
    });
  }*/
}
