import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private httpClient : HttpClient,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  isUserLoggedIn() {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }

  static getCurrentUser() : string{
    return sessionStorage.getItem('user')!;
  }

  static getCurrentUserObject() {
    if (sessionStorage.getItem('user') != null) {
      return JSON.parse(sessionStorage.getItem('user')!);
    }
  }

  static getJwtHeaderJSON() {
    return {headers: {'Content-Type':'application/json','Authorization':"Bearer " + JSON.parse(sessionStorage.getItem('user')!).token}};
  }

  static getJwtHeaderMultipart() {
    return {headers: {'Authorization':"Bearer " + JSON.parse(sessionStorage.getItem('user')!).token}};
  }
}
