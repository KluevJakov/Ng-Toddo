import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { AppComponent } from 'src/app/app.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, 
              private router: Router,
              public fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  login() {
    this.http.post<any>(API_URL + '/login', this.formLogin.value)
      .subscribe(
        (result: any) => {
          AppComponent.alertMsg("Успешная авторизация", "success");
          sessionStorage.setItem('user', JSON.stringify(result));
          this.router.navigate(['/profile']);
        },
        (error: HttpErrorResponse) => {
          (document.getElementById("password") as HTMLInputElement).value = '';
          AppComponent.alertMsg(error.error, "warning");
        }
      );
  }
}
