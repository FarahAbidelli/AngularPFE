import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { situationClientProfes } from 'src/app/models/situationClientProfes';
import { SituationProfesService } from './../../../services/situationProfesService';

@Component({
  selector: 'app-detailsl-situation',
  templateUrl: './detailsl-situation.component.html',
  styleUrls: ['./detailsl-situation.component.css']
})
export class DetailslSituationComponent implements OnInit {
  situationId: number | undefined;
  situation: situationClientProfes | undefined;
  situations  : situationClientProfes[] = [];


  constructor(private route: ActivatedRoute, private SituationProfesService:SituationProfesService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.situationId = +params['id'];
      this.SituationProfesService.getSituationById(this.situationId).subscribe(situation => this.situation = situation);
    });
  }
}
