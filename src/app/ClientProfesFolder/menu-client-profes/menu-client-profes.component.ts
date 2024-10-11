import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/models/privilege';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-menu-client-profes',
  templateUrl: './menu-client-profes.component.html',
  styleUrls: ['./menu-client-profes.component.css']
})
export class MenuClientProfesComponent {
  menus: any[] = [];
  user: User = new User();
  roles: string[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;
  privileges : Privilege[]=[];

  //men hena
  accessAdmin : boolean = false ;
  accessManager : boolean = false ;
  accessUser : boolean = false ;
  constructor(public authService: AuthService, private menuService: MenuService,private pservice:PrivilegeService , private tokenStorageService:TokenstorageService) {}

  ngOnInit(): void {
    this.canAdminAccess();
    this.canManagerAccess();
    this.canUserAccess()

  }
// maahom 3 methode hedhom f ts mtaa 3 menu eli aana f projet
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

  toggleMenu(menu: any) {
    menu.expanded = !menu.expanded;
  }

}


