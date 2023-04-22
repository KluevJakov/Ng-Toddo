import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    
  }

  isAuth() : boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    this.authService.logOut();
  }
}
