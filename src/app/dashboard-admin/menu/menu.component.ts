import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: any[] = [];
  user: User = new User();
  roles: string[] = [];
  //roles: Roles[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;
  privileges : Privilege[]=[];
  accessAdmin : boolean = false ;
  accessManager : boolean = false ;
  accessUser : boolean = false ;
  constructor(public authService: AuthService, private menuService: MenuService,private pservice:PrivilegeService, private tokenStorageService:TokenstorageService) {}

  ngOnInit(): void {
    this.canAdminAccess();
    this.canManagerAccess();
    this.canUserAccess()

    this.menuService.getModuls().subscribe({
      next: (data) => {
        this.menus = data
      },
      error: (error) => {
        console.log(error);
      }
    });
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
  canAdminAccess()
  {
    this.roles = this.tokenStorageService.getRoles() ;
    if(this.roles.includes('ROLE_ADMIN')){
          this.accessAdmin = true ;
    } else {
          // this.router.navigate(['home'])
    }
  }


  canManagerAccess()
  {
    this.roles = this.tokenStorageService.getRoles() ;
    if(this.roles.includes('ROLE_MANAGER')){
          this.accessManager = true ;
    } else {
          // this.router.navigate(['home'])
    }
  }

  canUserAccess()
  {
    this.roles = this.tokenStorageService.getRoles() ;
    if(this.roles.includes('ROLE_USER')){
          this.accessUser = true ;
    } else {
          // this.router.navigate(['home'])
    }
  }



  handleLogout() {
    this.authService. logout();
  }

}


