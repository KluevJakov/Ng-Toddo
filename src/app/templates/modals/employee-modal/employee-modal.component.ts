import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { Department } from 'src/app/models/department';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';
import { UserModalComponent } from '../user-modal/user-modal.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  creatingUser!: User;
  departmentList!: Array<Department>;
  usersInDep!: Array<User>;
  depInfo!: Array<string>;
  allowCreateUser: boolean = true;
  allowUploadCsv: boolean = true;
  csvFileToUpload: File | any = null;
  csvTooltip: string = "Требуется .csv файл с маппингом полей (email,фамилия,имя,отчество,адрес,должность,телефон)";

  constructor(private activeModal: NgbActiveModal, 
    private http: HttpClient,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.init();
  }

  showEditUserModal(userToEdit : User) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.user = userToEdit;
    modalRef.componentInstance.departmentList = this.departmentList;
    modalRef.result.then(() => {
      this.init();
    }).catch(e => {
      this.init();
    });
  }

  init() {
    this.http.get<any>(API_URL + '/deps/', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.getDepartmentList.bind(this)
      });

    this.refreshDepInfo();
  }

  createUser() {
    this.creatingUser = new User({});
    this.creatingUser.email = (document.getElementById('userEmail') as HTMLInputElement).value;
    this.creatingUser.surname = (document.getElementById('userSurname') as HTMLInputElement).value;
    this.creatingUser.name = (document.getElementById('userName') as HTMLInputElement).value;
    this.creatingUser.patronymic = (document.getElementById('userPatronymic') as HTMLInputElement).value;
    this.creatingUser.address = (document.getElementById('userAddress') as HTMLInputElement).value;
    this.creatingUser.jobPosition = (document.getElementById('userJobPosition') as HTMLInputElement).value;
    this.creatingUser.phone = (document.getElementById('userPhone') as HTMLInputElement).value;

    this.http.post<any>(API_URL + '/users/register', this.creatingUser, AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.handleSuccessCreate.bind(this),
        error: this.handleError.bind(this)
      });
  }

  selectDep(depId : number) {
    this.http.get<any>(API_URL + '/users?depId='+depId, AuthService.getJwtHeaderJSON())
    .subscribe({
      next: this.getUsersInDep.bind(this)
    });
  }

  refreshDepInfo() {
    this.http.get<any>(API_URL + '/deps/depInfo', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.getDepInfo.bind(this)
      });
  }

  getUsersInDep(usersInDep : Array<User>) {
    this.usersInDep = usersInDep;
  }

  getDepartmentList(departmentList : Array<Department>) {
    this.departmentList = departmentList;
    this.selectDep(2);
  }

  getDepInfo(depInfo: Array<string>) {
    this.depInfo = depInfo;
  }

  importUser() {
    const formData: FormData = new FormData();
    formData.append('file', this.csvFileToUpload, this.csvFileToUpload.name);
    this.http.post<any>(API_URL + '/users/importUsers', formData, AuthService.getJwtHeaderMultipart())
      .subscribe({
        next: this.handleSuccessImport.bind(this),
        error: this.handleError.bind(this)
      });
  }

  handleFileInput(files: FileList) {
    this.csvFileToUpload = files.item(0);
    this.allowUploadCsv = false;
  }

  handleSuccessImport(message: Message) {
    AppComponent.alertMsg(message.message, "success");
    this.selectDep(8);
    this.refreshDepInfo();
  }

  handleSuccessCreate(message: Message) {
    AppComponent.alertMsg(message.message, "success");
    this.creatingUser = new User({});
    (document.getElementById('userEmail') as HTMLInputElement).value = '';
    (document.getElementById('userSurname') as HTMLInputElement).value = '';
    (document.getElementById('userName') as HTMLInputElement).value = '';
    (document.getElementById('userPatronymic') as HTMLInputElement).value = '';
    (document.getElementById('userAddress') as HTMLInputElement).value = '';
    (document.getElementById('userJobPosition') as HTMLInputElement).value = '';
    this.selectDep(8);
    this.refreshDepInfo();
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
