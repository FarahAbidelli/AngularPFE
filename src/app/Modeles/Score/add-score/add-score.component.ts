import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { Variable } from 'src/app/models/variable';
import { VariableService } from 'src/app/services/variable.service';
import { ScoreService } from 'src/app/services/score.service';
import Swal from 'sweetalert2';
import { Type } from 'src/app/models/type.enum'; // Importer l'énumération Type


@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {
  score: Score = new Score();
  variable: Variable | undefined;
  variableId: number | undefined;

  // Déclarer l'énumération Type pour l'utiliser dans le template
  Type = Type;

  constructor(
    private scoreService: ScoreService,
    private variableService: VariableService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.variableId = +this.route.snapshot.params['variableId'];
    console.log('Variable ID:', this.variableId);

    if (this.variableId) {
      this.variableService.getVariableById(this.variableId).subscribe({
        next: (res) => {
          this.variable = res;
          console.log('Variable:', this.variable);
          this.score.variableId = this.variableId;
        },
        error: (error) => {
          console.error('Error fetching variable with ID:', this.variableId, error);
        }
      });
    } else {
      console.error('Variable ID is not provided.');
    }
  }

  createScore(): void {
    if (!this.variableId) {
      Swal.fire({
        icon: 'error',
        text: 'Variable ID is required to add a score.',
      });
      return;
    }

    this.scoreService.createScore(this.score).subscribe({
      next: (response) => {
        console.log('Score created successfully:', response);
        Swal.fire({
          icon: 'success',
          text: 'Score created successfully',
        });
        this.router.navigate(['/admin/Modele/list-modele']);
      },
      error: (err) => {
        console.error('Error creating score:', err);
        Swal.fire({
          icon: 'error',
          text: 'Failed to create score. Please check the console for more details.',
        });
      }
    });
  }

  isType(type: Type): boolean {
    return this.variable?.type === type;
  }
}
