import { Variable } from './../../../models/variable';
import { Notation } from './../../../models/notation';
import { Component, OnInit } from '@angular/core';
import { VariableService } from 'src/app/services/variable.service';
import { NotationService } from 'src/app/services/notation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notation-consulter',
  templateUrl: './list-notation-consulter.component.html',
  styleUrls: ['./list-notation-consulter.component.css']
})
export class ListNotationConsulterComponent implements OnInit  {
  notations: any[] = [];
  variables: Variable[] = [];
  notationId:any;

  constructor(
    private variableService: VariableService,
    private notationService: NotationService,
    private router:Router,
    private route: ActivatedRoute
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

  ConsulterNotation(id:any):void{
    this.router.navigate(['/consulter-notation',id]);
  }


}
