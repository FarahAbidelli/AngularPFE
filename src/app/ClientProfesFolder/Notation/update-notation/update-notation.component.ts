import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from 'src/app/services/variable.service';
import { Type } from 'src/app/models/type.enum';
import { Response } from 'src/app/models/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-notation',
  templateUrl: './update-notation.component.html',
  styleUrls: ['./update-notation.component.css']
})
export class UpdateNotationComponent implements OnInit{

  variables : any[] = [];
  totalModules:any;
  p: number = 1;
  itemsPerPage : number =5;
  searchtext:any;
  Type = Type;
  responses : Response[] = [];
  notationId:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.notationId = params['id'];
    });

    this.loadVariable();
  }

  constructor(private route: ActivatedRoute, private service: VariableService, private router: Router) {}

  loadVariable():void{
    this.service.getAllVariableResponses(this.notationId).subscribe({
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

  submitResponse() : any {
    const response = {id:this.notationId,responses : this.responses, status : "IN_PROGRESS"}
    return this.service.updateResponses(response).subscribe({
      next: (data)=>{

      Swal.fire(
        "note",
        "est :"+ data.note
      );

    },
     error: (Error)=>{
      console.log(Error);
     }
  })}
}
