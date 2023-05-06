import { Component } from '@angular/core';
import { AuthService } from './services/AuthService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-toddo';

  constructor(public auth: AuthService) {}

  logout() {
    AppComponent.alertMsg("Успешная деавторизация", "success");
    this.auth.logOut();
  }

  public static alertMsg(msgChange:string, typeChange:string) {
    let alertElem = document.getElementById('logoutAlert')!;
    alertElem.style.opacity = "1";
    alertElem.style.zIndex = "1056";

    alertElem.innerHTML = msgChange;

    alertElem.classList.remove("alert-success");
    alertElem.classList.remove("alert-danger");
    alertElem.classList.remove("alert-primary");
    alertElem.classList.remove("alert-secondary");
    alertElem.classList.remove("alert-warning");
    alertElem.classList.remove("alert-info");
    alertElem.classList.remove("alert-light");
    alertElem.classList.remove("alert-dark");

    alertElem.classList.add("alert-"+typeChange);

    setTimeout(() => {
      alertElem.style.opacity = "0";
      alertElem.style.zIndex = "-1";
    }, 3000);
  }
}
