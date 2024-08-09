import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User = new User(); 
  userId: number = 0;

  constructor(
    private userService: UserService, 
    private sniper: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.sniper.snapshot.params['id'];
    this.userService.getByUserId(this.userId).subscribe({
      next : (res) => {
        this.user = res;
      },
      error : (error) =>{
        console.error('error fetching user with id :' +this.userId, error);
      }
    })
  }
  updateUser(): void {
    this.userService.updateUser(this.userId, this.user).subscribe({
        next: (res) => {
            Swal.fire({
                title: 'Succès!',
                text: 'Les informations de l\'utilisateur ont été mises à jour avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.value) {
                    this.router.navigate(['admin/list-users']);
                }
            });
        },
        error: (error) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur avec l\'ID : ' + this.userId, error);
            Swal.fire({
                title: 'Erreur!',
                text: 'Échec de la mise à jour des informations de l\'utilisateur.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

}
