import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { Variable } from 'src/app/models/variable';
import { ScoreService } from 'src/app/services/score.service';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulter-scores-variable',
  templateUrl: './consulter-scores-variable.component.html',
  styleUrls: ['./consulter-scores-variable.component.css']
})
export class ConsulterScoresVariableComponent implements OnInit{

  variable: Variable | undefined;
  ponderationValue: number | undefined;
  variableId: number | null = null;
  constructor(
    private scoreService: ScoreService,
    private variableService: VariableService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('Variable ID from route:', id);
      this.loadVariableWithScores(id);
    //  this.valeurPonderer(id);
    });
  }

  loadVariableWithScores(id: number): void {
    this.variableService.getVariableById(id).subscribe(
      (data: Variable) => {
        this.variable = data;
        console.log('Variable loaded:', this.variable);
        this.variable.scores.forEach(score => console.log('Score:', score));
      },
      error => {
        console.error('Error loading variable details:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement de la variable', 'error');
      }
    );
  }

  /*valeurPonderer(id: number): void {
    this.variableService.valeurPonderer(id).subscribe(
      (data: any) => {
        this.ponderationValue = data;
        console.log('Ponderation value loaded:', this.ponderationValue);
      },
      error => {
        console.error('Error loading ponderation value:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement de la valeur de pondération', 'error');
      }
    );
  } */
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

            if (score.id) {
              this.updateScore(score.id, score);
            } else {
              console.error('Score ID is undefined');
            }
          }
        });
      },
      error => {
        console.error('Error fetching score details:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement du score', 'error');
      }
    );
  }





  updateScore(scoreId: number, updatedScore: Score): void {
    // Préparation du payload
    const payload: any = {
      id: updatedScore.id,
      score: updatedScore.score,
      variableId: updatedScore.variableId,
      type: updatedScore.type
    };

    // Gestion spéciale pour les types spécifiques
    if (updatedScore.type === 'DATE' && updatedScore.valeur) {
      // Assurer que la valeur est bien formatée en ISO (YYYY-MM-DD)
      payload.valeur = new Date(updatedScore.valeur).toISOString().split('T')[0];
    } else if (updatedScore.type === 'INTERVALE' && updatedScore.vmin !== undefined && updatedScore.vmax !== undefined) {
      payload.vmin = updatedScore.vmin;
      payload.vmax = updatedScore.vmax;
    } else if (updatedScore.type === 'NUMBER' && updatedScore.valeur !== undefined) {
      payload.valeur = updatedScore.valeur;
    } else if (updatedScore.type === 'ENUMERATION' && updatedScore.valeur) {
      payload.valeur = updatedScore.valeur;
    } else {
      payload.valeur = updatedScore.valeur;
    }

    this.scoreService.updateScore(scoreId, payload).subscribe(
      updated => {
        console.log('Score mis à jour avec succès :', updated);
        if (this.variable && this.variable.id) {
          this.loadVariableWithScores(this.variable.id);
        } else {
          console.error('Variable ID is undefined or variable itself is not defined');
        }
        Swal.fire('Succès', 'Score mis à jour avec succès!', 'success');
      },
      error => {
        console.error('Erreur lors de la mise à jour du score :', error);
        console.error('Error details:', error.message || error);
        console.error('Request Payload:', payload);
        Swal.fire('Erreur', 'Erreur lors de la mise à jour du score: ' + error.message, 'error');
      }
    );
  }









  deleteScore(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de supprimer ce Choix!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.scoreService.deleteScore(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le Choix a été supprimé.', 'success');
            if (this.variable?.id) {
              this.loadVariableWithScores(this.variable.id);
            } else {
              console.error('Variable ID is undefined after score deletion');
            }
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de Choix :', error);
            Swal.fire('Échec de la suppression!', 'La suppression de Choix a échoué. ' + error.message, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'La suppression a été annulée', 'error');
      }
    });
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



  openAddScoreForm(): void {
    if (!this.variable) {
      console.error('Variable is undefined');
      return;
    }

    let htmlContent = '';
    switch (this.variable.type) {
      case 'ENUMERATION':
        htmlContent =
          '<input id="swal-input-score" class="swal2-input" placeholder="Score">' +
          '<input id="swal-input-value" class="swal2-input" placeholder="Choix">';
        break;
      case 'INTERVALE':
        htmlContent =
          '<input id="swal-input-score" class="swal2-input" placeholder="Score">' +
          '<input id="swal-input-vmin" class="swal2-input" placeholder="Valeur Min">' +
          '<input id="swal-input-vmax" class="swal2-input" placeholder="Valeur Max">';
        break;
      case 'DATE':
        htmlContent =
          '<input id="swal-input-score" class="swal2-input" placeholder="Score">' +
          '<input id="swal-input-date" class="swal2-input" placeholder="Date" type="date">';
        break;
      case 'NUMBER':
        htmlContent =
          '<input id="swal-input-score" class="swal2-input" placeholder="Score">' +
          '<input id="swal-input-num" class="swal2-input" placeholder="Nombre">';
        break;
      default:
        console.error('Invalid variable type');
        return;
    }

    Swal.fire({
      title: 'Ajouter un Score',
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const scoreValue = (document.getElementById('swal-input-score') as HTMLInputElement).value;
        const scoreDto: any = {
          variableId: this.variable?.id,
          score: parseFloat(scoreValue),
        };

        if (isNaN(scoreDto.score)) {
          Swal.showValidationMessage('Le score doit être un nombre valide');
          return;
        }

        switch (this.variable?.type) {
          case 'ENUMERATION':
            scoreDto.enumeration = (document.getElementById('swal-input-value') as HTMLInputElement).value;
            if (!scoreDto.enumeration) {
              Swal.showValidationMessage('Le choix est requis');
              return;
            }
            break;
          case 'INTERVALE':
            scoreDto.vmin = parseFloat((document.getElementById('swal-input-vmin') as HTMLInputElement).value);
            scoreDto.vmax = parseFloat((document.getElementById('swal-input-vmax') as HTMLInputElement).value);
            if (isNaN(scoreDto.vmin) || isNaN(scoreDto.vmax)) {
              Swal.showValidationMessage('Les valeurs min et max doivent être des nombres valides');
              return;
            }
            break;
          case 'DATE':
            scoreDto.date = (document.getElementById('swal-input-date') as HTMLInputElement).value;
            if (!scoreDto.date) {
              Swal.showValidationMessage('La date est requise');
              return;
            }
            break;
          case 'NUMBER':
            scoreDto.num = parseFloat((document.getElementById('swal-input-num') as HTMLInputElement).value);
            if (isNaN(scoreDto.num)) {
              Swal.showValidationMessage('Le nombre doit être un nombre valide');
              return;
            }
            break;
          default:
            Swal.showValidationMessage('Type de variable invalide');
            return;
        }

        return scoreDto;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.addScore(result.value);
      }
    });
  }

  addScore(scoreDto: any): void {
    this.scoreService.createScore(scoreDto).subscribe(
      () => {
        console.log('Score ajouté avec succès');
        if (this.variable?.id) {
          this.loadVariableWithScores(this.variable.id);
        }
        Swal.fire('Succès', 'Score ajouté avec succès!', 'success');
      },
      error => {
        console.error('Erreur lors de l\'ajout du score :', error);
        Swal.fire('Erreur', 'Erreur lors de l\'ajout du score', 'error');
      }
    );
  }
}
