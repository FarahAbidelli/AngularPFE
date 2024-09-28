import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientProfes } from 'src/app/models/clientProfes';
import { ClientProfesService } from 'src/app/services/clientProfesService';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-client-notation',
  templateUrl: './list-client-notation.component.html',
  styleUrls: ['./list-client-notation.component.css']
})
export class ListClientNotationComponent {
  clients  : ClientProfes[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
  searched: boolean = false;
  codeRelation: any;
  exists: boolean = false;
  notExists: boolean = false;
constructor(private service:ClientProfesService,
            private router:Router){}

ngOnInit(): void {
   this.loadClient();
}
loadClient():void{
  this.service.getClients().subscribe({
    next: (data) =>{
      this.clients = data ;
      this.totalUsers=data.length;

    },
    error : (Error) =>{
      console.log(Error);
      }
    });
  }
  NotationClient(id:any):void{
    this.router.navigate(['/noter-client-form',id]);
  }


}
