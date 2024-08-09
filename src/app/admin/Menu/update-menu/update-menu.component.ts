import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit{
  menu:Menu = new Menu() ;
  cdMenu:string = '';

  constructor(private service:MenuService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.cdMenu = this.sniper.snapshot.params['cdMenu'];
    this.service.getByCdMenu(this.cdMenu).subscribe({
      next : (res) => {
        this.menu = res;
      },
      error : (error) =>{
        console.error('error fetching menu with code menu :' +this.cdMenu, error);
      }
    })
  }
  updateMenu(): void {
    this.service.updateMenu(this.cdMenu, this.menu).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Succès!',
          text: 'Menu mis à jour avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['admin/list-menu']);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du menu avec le code menu : ' + this.cdMenu);
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur lors de la mise à jour du menu!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
