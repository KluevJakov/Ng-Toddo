import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'user-profile-block',
  templateUrl: './user-profile-block.component.html',
  styleUrls: ['./user-profile-block.component.css']
})
export class UserProfileBlockComponent implements OnInit {

  @Input() user!: User;

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