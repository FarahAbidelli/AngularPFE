import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { Variable } from 'src/app/models/variable';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';
import { ScoreService } from 'src/app/services/score.service';
import { Score } from 'src/app/models/score';
import { VariableService } from 'src/app/services/variable.service';




@Component({
  selector: 'app-variables-modele',
  templateUrl: './variables-modele.component.html',
  styleUrls: ['./variables-modele.component.css']
})
export class VariablesModeleComponent implements OnInit{
  modele: Modele | null = null;
  variableId: number | null = null;

  variables: Variable[] = [];
  id: number = 0;
  p: number = 1;
  itemsPerPage: number = 5;
  totalModules: any;
  searchtext: any;
  ponderationValue: number | undefined;
  modeleId: number | null = null;
  variable: any | undefined;


  constructor(
    private scoreService: ScoreService,
    private service:ModeleService ,
    private sniper:ActivatedRoute,
    private variableService: VariableService,
    private router:Router){ }


  ngOnInit(): void {
    this.id = this.sniper.snapshot.params['id'];
    this.loadModele();
    this.valeurPonderer(this.id);


  }
  valeurPonderer(id: number): void {
    this.service.valeurPonderer(id).subscribe(
      (data: any) => {
        this.ponderationValue = data; // Supposons que `data` est une valeur calculée
        console.log('Ponderation value loaded:', this.ponderationValue);
      },
      error => {
        console.error('Error loading ponderation value:', error);
      }
    );
  }
  loadModele(): void {
    this.service.getModeleById(this.id).subscribe({
      next: (res) => {
        this.modele = res;
        this.variables = res.variables;
      },
      error: (error) => {
        console.error('Error fetching Modele with id: ' + this.id, error);
      }
    });
  }
  addVariable(id:any):void {
    this.router.navigate(['/admin/Variable/add-variable',id]);
  }
  openUpdateForm(scoreId?: number): void {
    if (scoreId === undefined || !this.variable) {
      console.error('Score ID or variable is undefined');
      return;
    }

    this.scoreService.ScoreById(scoreId).subscribe(
      (score: Score) => {
        console.log('Received score from backend:', score);

        let inputHtml = '';

        switch (score.type) {
          case 'ENUMERATION':
            inputHtml = `<input id="swal-input2" style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouveau Choix" value="${score.valeur ?? ''}">`;
            break;
          case 'INTERVALE':
            inputHtml =
              `<input id="swal-input3" style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Valeur Min" value="${score.vmin ?? ''}">` +
              `<input id="swal-input4" style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Valeur Max" value="${score.vmax ?? ''}">`;
            break;
          case 'DATE':
            inputHtml = `<input id="swal-input-date" class="swal2-input" placeholder="Date" type="date" value="${score.valeur ?? ''}">`;
            break;
          case 'NUMBER':
            inputHtml = `<input id="swal-input6" style="font-size: 16px;font-family: serif" class="swal2-input" type="number" value="${score.valeur ?? ''}">`;
            break;
          default:
            inputHtml = `<input id="swal-input2" style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Valeur" value="${score.valeur ?? ''}">`;
            break;
        }

        Swal.fire({
          title: 'Modifier Score',
          html:
            `<input id="swal-input1" style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouveau Score" value="${score.score ?? ''}">` +
            inputHtml,
          showCancelButton: true,
          confirmButtonText: 'Modifier',
          cancelButtonText: 'Annuler',
          preConfirm: () => {
            const newScore = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const newChoice = (document.getElementById('swal-input2') as HTMLInputElement)?.value;
            const newVMin = (document.getElementById('swal-input3') as HTMLInputElement)?.value;
            const newVMax = (document.getElementById('swal-input4') as HTMLInputElement)?.value;
            const newDate = (document.getElementById('swal-input-date') as HTMLInputElement)?.value;
            const newNumber = (document.getElementById('swal-input6') as HTMLInputElement)?.value;

            score.score = parseFloat(newScore);

            switch (score.type) {
              case 'ENUMERATION':
                score.valeur = newChoice ?? undefined;
                break;
              case 'INTERVALE':
                score.vmin = newVMin ? parseFloat(newVMin) : undefined;
                score.vmax = newVMax ? parseFloat(newVMax) : undefined;
                break;
              case 'DATE':
                score.valeur = newDate ?? undefined;
                break;
              case 'NUMBER':
                score.valeur = newNumber ? parseFloat(newNumber) : undefined;
                break;
              default:
                score.valeur = newChoice ?? undefined;
                break;
            }
/*
            if (score.id) {
              this.updateScore(score.id, score);
            } else {
              console.error('Score ID is undefined');
            }*/
          }
        });
      },
      error => {
        console.error('Error fetching score details:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement du score', 'error');
      }
    );
  }

  openUpdateVariableForm(): void {
    Swal.fire({
      title: 'Modifier Question',
      html:
        '<input id="swal-input1"style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouvelle Description" value="' + this.variable?.description + '">' +
        '<input id="swal-input2"style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouveau Code" value="' + this.variable?.code + '">' +
        '<input id="swal-input3"style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouveau Coefficient" value="' + (this.variable && this.variable.coefficient !== undefined ? this.variable.coefficient.toString() : '') + '">' +
        '<input id="swal-input4" disabled style="font-size: 16px;font-family: serif" class="swal2-input" placeholder="Nouveau Type" value="' + (this.variable && this.variable.type ? this.variable.type.toString() : '') + '">',

      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const newDescription = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const newCode = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const newCoefficient = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const newType = (document.getElementById('swal-input4') as HTMLInputElement).value;
          let parsedCoefficient = this.variable?.coefficient;
        if (newCoefficient) {
          parsedCoefficient = parseFloat(newCoefficient);
          if (isNaN(parsedCoefficient)) {
            console.error('Nouveau coefficient invalide :', newCoefficient);
            parsedCoefficient = this.variable?.coefficient;
          }
        }
          if (this.variable && newType) {
          this.variable.description = newDescription;
          this.variable.code = newCode;
          if (parsedCoefficient !== undefined) {
            this.variable.coefficient = parsedCoefficient;
          }

          this.variableService.updateVariable(this.variable.id, this.variable).subscribe(
            updated => {
              console.log('Variable mise à jour avec succès :', updated);
              Swal.fire('Succès', 'Question mise à jour avec succès!', 'success');
            },
            error => {
              console.error('Erreur lors de la mise à jour de la question :', error);
              Swal.fire('Erreur', 'Erreur lors de la mise à jour de la question', 'error');
            }
          );
        } else {
          console.error('Type de variable invalide :', newType);
        }
      }
    });
  }

}
