import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(API_URL + '/users/profile', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.loadUser.bind(this),
        error: this.handleError.bind(this)
      });
  }

  loadUser(result: any) {
    this.user = new User(result);
  }

  handleError(error: HttpErrorResponse) {
    AppComponent.alertMsg("Сервер не запущен, обратитесь к администратору", "danger");
    console.log(error.error);
  }
}