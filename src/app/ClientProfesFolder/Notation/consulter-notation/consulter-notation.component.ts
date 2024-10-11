import { Component, OnInit } from '@angular/core';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import { VariableService } from 'src/app/services/variable.service';
import { NotationService } from 'src/app/services/notation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-consulter-notation',
  templateUrl: './consulter-notation.component.html',
  styleUrls: ['./consulter-notation.component.css']
})
export class ConsulterNotationComponent implements OnInit{
  notationsFinalisees: any[] = []; // Remplacer par le modèle approprié
  notationId:any;
  notationsFinaliseesById: any[] = [];
  constructor(private service: VariableService,
    private notationService: NotationService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.notationId = params['id'];
    });
    this.loadNotationsFinaliseesById();
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
  loadNotationsFinaliseesById(): void {
    this.service.getNotationById(this.notationId).subscribe({
      next: (data) => {
        this.notationsFinaliseesById = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notations finalisées :', error);
      }
    });
  }
}
