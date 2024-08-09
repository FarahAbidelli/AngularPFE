import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProfes } from 'src/app/models/clientProfes';
import { ClientProfesService } from 'src/app/services/clientProfesService';

@Component({
  selector: 'app-detailsl-client',
  templateUrl: './detailsl-client.component.html',
  styleUrls: ['./detailsl-client.component.css']
})
export class DetailslClientComponent implements OnInit{
  clientId: number | undefined;
  client: ClientProfes | undefined;

  constructor(private route: ActivatedRoute, private clientProfesService:ClientProfesService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.clientProfesService.getClientId(this.clientId).subscribe(client => this.client = client);
    });
  }

}
