import { Component, OnInit } from '@angular/core';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-consulter-notation',
  templateUrl: './consulter-notation.component.html',
  styleUrls: ['./consulter-notation.component.css']
})
export class ConsulterNotationComponent implements OnInit{
  notationsFinalisees: any[] = []; // Remplacer par le modèle approprié

  constructor(private service: VariableService) {}

  ngOnInit(): void {
    this.loadNotationsFinalisees();
  }

  loadNotationsFinalisees(): void {
    this.service.getTerminated().subscribe({
      next: (data) => {
        this.notationsFinalisees = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notations finalisées :', error);
      }
    });
  }
}
