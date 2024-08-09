import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrls: ['./role-user.component.css']
})
export class RoleUserComponent {
  user: User = {
    userRoles: []
  };
    roles : any[] = [];

    constructor(
      private service: UserService,
      private route: ActivatedRoute
    ) {}
    ngOnInit(){
      this.loadProduct();
    }
    loadProduct():void{

    const userId = this.route.snapshot.params['id'];
    this.service.getUserRole(userId).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', err);
      }
    });
  }
  
  removeRole(userId: number, roleId: number) {
    this.service.removeRoleFromUser(userId, roleId).subscribe({
      next: () => {
        this.loadProduct();
            },
      error: (error) => {
        console.error('error to delete role :', error);
      }
    });
  }
}
