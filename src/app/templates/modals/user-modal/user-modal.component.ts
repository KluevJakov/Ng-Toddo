import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { Department } from 'src/app/models/department';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user!: User;
  @Input() departmentList!: Array<Department>;
  currentUser!: User;

  constructor(private activeModal: NgbActiveModal,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = AuthService.getCurrentUserObject();
  }

  editUser() {
    this.user.surname = (document.getElementById('userSurnameEdit') as HTMLInputElement).value;
    this.user.name = (document.getElementById('userNameEdit') as HTMLInputElement).value;
    this.user.patronymic = (document.getElementById('userPatronymicEdit') as HTMLInputElement).value;
    this.user.phone = (document.getElementById('userPhoneEdit') as HTMLInputElement).value;
    this.user.address = (document.getElementById('userAddressEdit') as HTMLInputElement).value;
    this.user.jobPosition = (document.getElementById('userJobPositionEdit') as HTMLInputElement).value;
    this.user.department.id = parseInt((document.getElementById('depSelectEdit') as HTMLInputElement).value);

    this.http.post<any>(API_URL + '/users/updateUser', this.user, AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.handleSuccessCreate.bind(this),
        error: this.handleError.bind(this)
      });
    return false;
  }

  handleSuccessCreate(message: Message) {
    AppComponent.alertMsg(message.message, "success");
    this.close();
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == 400) {
      AppComponent.alertMsg(error.error, "warning");
    } else {
      AppComponent.alertMsg("Ошибка сервера, попробуйте позже", "danger");
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
