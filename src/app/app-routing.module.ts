import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/AuthService/auth.service';
import { SheetsComponent } from './components/sheets/sheets.component';
import { SheetsitemComponent } from './components/sheets/sheetsitem/sheetsitem.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthService]},
  {path: 'sheets', component: SheetsComponent, canActivate:[AuthService]},
  {path: 'sheets/:id', component: SheetsitemComponent, canActivate:[AuthService]},
  {path: '', component: IndexComponent},
  {path: "**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
