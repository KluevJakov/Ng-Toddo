import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
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

  auth(): void {
    this.register(this.formRegister)
      .subscribe(
        (result: any) => {
          AppComponent.alertMsg("Успешная регистрация", "success");
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          AppComponent.alertMsg(error.error, "warning");
        }
      );
  }

  register(form: FormGroup): Observable<any> {
    return this.http.post<any>(API_URL + '/register', form.value);
  }

}
