import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-body-dashboard',
  templateUrl: './body-dashboard.component.html',
  styleUrls: ['./body-dashboard.component.css']
})
export class BodyDashboardComponent implements OnInit{
  menus: any[] = [];
  user: User = new User();
  roles: Roles[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;
  privileges : Privilege[]=[];

  constructor(public authService: AuthService, private menuService: MenuService,private pservice:PrivilegeService) {}

  ngOnInit(): void {
    this.menuService.getModuls().subscribe({
      next: (data) => {
        this.menus = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleLogout() {
    this.authService.logout();
  }
  isAdmin(): boolean {
    return this.authService.hasAccess({ cdRole: 'ROLE_ADMIN' });
  }
  isUser(): boolean {
    return this.authService.hasAccess({ cdRole: 'ROLE_USER' });
  }
  toggleMenu(menu: any) {
    menu.expanded = !menu.expanded;
  }
  
}
