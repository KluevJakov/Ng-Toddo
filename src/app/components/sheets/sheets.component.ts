import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { Group } from 'src/app/models/group';
import { Sheet } from 'src/app/models/sheet';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.css']
})
export class SheetsComponent implements OnInit {
  bsModalRef?: BsModalRef;
 
  confirmModalRef?: BsModalRef;
  confirmResolve?: () => void;
  confirmReject?: () => void;
  confirmPromise?: Promise<void>;

  sheets? : Array<Sheet>;
 
  constructor(private modalService: BsModalService,
    private http : HttpClient) {}

  ngOnInit(): void {
    this.getAllSheets();

    setInterval(() => this.getAllSheets(), 1000);
  }
 
  openModalWithInterceptor() {
    this.bsModalRef = this.modalService.show(ModalContentWithInterceptorComponent);
  }

  getAllSheets() {
    this.http.get<any>(API_URL + '/sheet/personal/my', AuthService.getJwtHeader())
    .subscribe(
      (result: any) => {
        this.sheets = result;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }
}
 
@Component({
  selector: 'modal-content-with-interceptor',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Creating new Sheet</h4>
      <button type="button" class="close btn-close pull-right" aria-label="Close" (click)="bsModalRef.hide()"></button>
    </div>
    <div class="modal-body">
      <form method="POST" ngNativeValidate>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title" class="form-control" (keyup)="validateFields()" required/>
        <label for="description">Description:</label>
        <input type="text" name="description" id="description" class="form-control" (keyup)="validateFields()" required/>

        <label for="group" *ngIf="show">Assign to Group:</label>
        <select id="group" class="form-select" aria-label="Default select example" (change)="validateFields()" *ngIf="show">
          <option value="0" selected disabled>Choose group</option>
          <option value="1">Family</option>
          <option value="2">Job</option>
          <option value="3">Road to the dream</option>
        </select>
        
        <div class="btn-group w-100 mt-3" role="group" aria-label="Basic radio toggle button group">
          <input (click)="showGroupField(false)" type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="on" checked>
          <label class="btn btn-outline-dark" for="btnradio1">Personal</label>

          <input (click)="showGroupField(true)" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
          <label class="btn btn-outline-dark" for="btnradio2">Group</label>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" [disabled]="nonReadyForCreate" (click)="buildSheet()">Add</button>
      <button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})
 
export class ModalContentWithInterceptorComponent {
  constructor( public bsModalRef: BsModalRef, 
    private http: HttpClient, 
    private router: Router) { }

  show = false;
  nonReadyForCreate = true;
  sheet = new Sheet();

  showGroupField(value:boolean) {
    this.show = value;
    this.validateFields();
  }

  //TODO: add validation
  buildSheet() {
    let titleField = document.getElementById('title') as HTMLInputElement;
    let descriptionField = document.getElementById('description') as HTMLInputElement;
    let groupField = document.getElementById('group') as HTMLSelectElement;

    this.sheet.title = titleField.value;
    this.sheet.description = descriptionField.value;
    this.sheet.creator = new User(JSON.parse(AuthService.getCurrentUser()).id);
    
    if (groupField != null) {
      this.sheet.isGroup = true;
      this.sheet.assigned = new Group(parseInt(groupField.value));
    }

    this.http.post<any>(API_URL + '/sheet/create', this.sheet, AuthService.getJwtHeader())
      .subscribe(
        (result: any) => {
          AppComponent.alertMsg("Successfully create sheet", "success");
          this.bsModalRef.hide();
        },
        (error: HttpErrorResponse) => {
          AppComponent.alertMsg(error.error, "warning");
        }
      );
  }

  validateFields() {
    let titleField = document.getElementById('title') as HTMLInputElement;
    let descriptionField = document.getElementById('description') as HTMLInputElement;
    let groupField = document.getElementById('group') as HTMLSelectElement;

    if (titleField.value != '' && descriptionField.value != '') {
      if (this.show == true) {
        if (groupField != null) {
          if (groupField.value == '0') {
            this.nonReadyForCreate = true;
          } else {
            this.nonReadyForCreate = false;
          }
        } else {
          this.nonReadyForCreate = true;
        }
      } else {
        this.nonReadyForCreate = false;
      }
    } else {
      this.nonReadyForCreate = true;
    }
  }

}