import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDashboardComponent } from './dashboard-admin/menu-dashboard/menu-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BodyDashboardComponent } from './dashboard-admin/body-dashboard/body-dashboard.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { PermissionComponent } from './admin/permission/permission.component';
import { ListRolesComponent } from './admin/list-roles/list-roles.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { AddRoleComponent } from './admin/add-role/add-role.component';
import { RoleUserComponent } from './admin/role-user/role-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListModuleComponent } from './admin/Module/list-module/list-module.component';
import { UpdateModuleComponent } from './admin/Module/update-module/update-module.component';
import { AddModuleComponent } from './admin/Module/add-module/add-module.component';
import { AddMenuComponent } from './admin/Menu/add-menu/add-menu.component';
import { ListMenuComponent } from './admin/Menu/list-menu/list-menu.component';
import { UpdateMenuComponent } from './admin/Menu/update-menu/update-menu.component';
import { ListPrivilegeComponent } from './admin/privilege/list-privilege/list-privilege.component';
import { ListPrivilegeWithRoleComponent } from './admin/privilege/list-privilege-with-role/list-privilege-with-role.component';
import { AddPrivilegeComponent } from './admin/privilege/add-privilege/add-privilege.component';
import { UpdatePrivilegeComponent } from './admin/privilege/update-privilege/update-privilege.component';
import { RolesComponent } from './admin/roles/roles.component';
import { HabilitationEtRoleComponent } from './Habilitaion/habilitation-et-role/habilitation-et-role.component';
import { GestionModeleComponent } from './Modeles/gestion-modele/gestion-modele.component';
import { AddModeleComponent } from './Modeles/add-modele/add-modele.component';
import { ListModeleComponent } from './Modeles/list-modele/list-modele.component';
import { CorbeilleModeleComponent } from './Modeles/corbeille-modele/corbeille-modele.component';
import { UpdateModeleComponent } from './Modeles/update-modele/update-modele.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsClientComponent } from './ClientProfesFolder/details-client/details-client.component';
import { ListcComponent } from './ClientProfesFolder/listc/listc.component';
import { MenuClientProfesComponent } from './ClientProfesFolder/menu-client-profes/menu-client-profes.component';
import { ModuleClientProfesComponent } from './ClientProfesFolder/module-client-profes/module-client-profes.component';
import { DetailslSituationComponent } from './ClientProfesFolder/Situation/detailsl-situation/detailsl-situation.component';
import {UploadSituationlCsvComponent} from './ClientProfesFolder/Situation/upload-situationl-csv/upload-situationl-csv.component'
import {ListlSituationComponent} from './ClientProfesFolder/Situation/listl-situation/listl-situation.component'
import { UploadCsvClientComponent } from './ClientProfesFolder/upload-csv-client/upload-csv-client.component';
import { AddVariableComponent } from './Modeles/Variable/add-variable/add-variable.component';
import { ConsulterScoresVariableComponent } from './Modeles/Variable/consulter-scores-variable/consulter-scores-variable.component';
import { ListVariableComponent } from './Modeles/Variable/list-variable/list-variable.component';
import { VariablesModeleComponent } from './Modeles/Variable/variables-modele/variables-modele.component';
import { AddScoreComponent } from './Modeles/Score/add-score/add-score.component';
import { AjoutVariableComponent } from './Modeles/Variable/ajout-variable/ajout-variable.component';
import { NoterClientComponent } from './ClientProfesFolder/Notation/noter-client/noter-client.component';
import { NoterClientFormComponent } from './ClientProfesFolder/Notation/noter-client-form/noter-client-form.component';
import { ConsulterNotationComponent } from './ClientProfesFolder/Notation/consulter-notation/consulter-notation.component';
import { ModifierNotationComponent } from './ClientProfesFolder/Notation/modifier-notation/modifier-notation.component';
import { UpdateNotationComponent } from './ClientProfesFolder/Notation/update-notation/update-notation.component';

const routes: Routes = [
  {
    path: 'admin',
    component: MenuDashboardComponent,

    children: [
      { path: 'dashboard', component: BodyDashboardComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'permission/:id', component: PermissionComponent },
      { path: 'consulter-privilege', component: ListRolesComponent},
      { path: 'updateRole/:id', component: UpdateRoleComponent},
      { path: 'add-role', component: AddRoleComponent},
      { path: 'list-role-user/:id', component:RoleUserComponent},
      { path: 'list-users', component:ListUsersComponent},
      { path: 'update-user/:id', component:UpdateUserComponent},
      { path: 'list-modules', component:ListModuleComponent},
      { path: 'update-module/:cdModul', component:UpdateModuleComponent},
      { path: 'add-module', component:AddModuleComponent},
      { path: 'add-menu', component:AddMenuComponent},
      { path: 'list-menu', component:ListMenuComponent},
      { path: 'update-menu/:cdMenu', component:UpdateMenuComponent},
      { path: 'list-privilege', component:ListPrivilegeComponent},
      { path: 'privileges/:roleId', component: ListPrivilegeWithRoleComponent },
      { path: 'add-privilege', component: AddPrivilegeComponent},
      { path: 'update-privilege/:id', component: UpdatePrivilegeComponent},
      { path: 'roles', component: RolesComponent},
      { path: 'habilitation-et-role', component: HabilitationEtRoleComponent},
      { path: 'models',component: GestionModeleComponent},


      { path: 'Modele/add-modele',component: AddModeleComponent},
      { path: 'Modele/list-modele',component: ListModeleComponent},
      { path: 'Modele/corbeille-modele',component: CorbeilleModeleComponent},
      { path: 'Modele/update-modele/:id',component: UpdateModeleComponent},



      { path: 'ClientProfesFolder/details-client/:id',component: DetailsClientComponent},
      { path: 'ClientProfesFolder/list-client',component: ListcComponent},
      { path: 'ClientProfesFolder/listc',component: ListcComponent},
      { path: 'ClientProfesFolder/menu-client-profes', component: MenuClientProfesComponent},
      { path: 'ClientProfesFolder/module-client-profes', component: ModuleClientProfesComponent },
      { path: 'ClientProfesFolder/Situation/detailsl-situation/:id', component: DetailslSituationComponent},
      { path: 'ClientProfesFolder/Situation/list-situation', component: ListlSituationComponent},
      { path: 'ClientProfesFolder/Situation/upload-situation-csv', component: UploadSituationlCsvComponent},
      { path: 'ClientProfesFolder/upload-csv-client', component: UploadCsvClientComponent},

      { path: 'Score/add-score/:variableId', component: AddScoreComponent},
      { path: 'Variable/add-variable/:modeleId', component: AddVariableComponent},
      { path: 'Variable/ConsulterScoresVariable/:id', component: ConsulterScoresVariableComponent},
      { path: 'Variable/list-variable', component: ListVariableComponent},
      { path: 'Variable/add-variable', component: AddVariableComponent},
      { path: 'Modele/variables/:id', component:VariablesModeleComponent},
      { path: 'Variable/ajout-variable', component: AjoutVariableComponent},
      { path: 'ClientProfesFolder/Notation/noter-client', component: NoterClientComponent },
      { path: 'ClientProfesFolder/Notation/noter-client', component: NoterClientComponent },
      { path: 'ClientProfesFolder/Notation/noter-client-form', component: NoterClientFormComponent },
      { path: 'ClientProfesFolder/Notation/consulter-notation', component: ConsulterNotationComponent },
      { path: 'ClientProfesFolder/Notation/modifier-notation', component: ModifierNotationComponent },
      { path: 'updateNotation/:id',component: UpdateNotationComponent}

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
