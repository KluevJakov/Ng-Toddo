import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
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

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(API_URL + '/profile', AuthService.getJwtHeader())
    .subscribe(
      (result: any) => {
        this.user = new User(result);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }
}
