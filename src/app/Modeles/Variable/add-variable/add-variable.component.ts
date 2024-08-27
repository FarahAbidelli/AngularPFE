import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from 'src/app/models/variable';
import { ModeleService } from 'src/app/services/modele.service';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-variable',
  templateUrl: './add-variable.component.html',
  styleUrls: ['./add-variable.component.css']
})
export class AddVariableComponent {
  variable: Variable = new Variable();
  modeleId: number = 0;

  constructor(
    private service: VariableService,
    private router: Router,
    private modeleService: ModeleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.modeleId = +this.activatedRoute.snapshot.params['modeleId'];
    if (this.modeleId) {
      this.variable.modeleId = this.modeleId;
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Le modèle ID est manquant.',
      });
    }
  }

  create(): void {
    if (!this.variable.modeleId) {
      Swal.fire({
        icon: 'error',
        text: 'Le modèle ID est requis pour ajouter une variable.',
      });
      return;
    }

    this.service.addVariable(this.variable, this.variable.modeleId).subscribe({
      next: (data: Variable) => {
        if (!data.scores) {
          data.scores = [];
        }
        this.router.navigate(['/admin/Score/add-score', data.id]);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: 'Échec de l\'ajout de la variable. Veuillez vérifier les informations.',
        });
        console.log(err);
      },
    });
  }
}
