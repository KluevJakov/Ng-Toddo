import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { Sheet } from 'src/app/models/sheet/sheet';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-sheetsitem',
  templateUrl: './sheetsitem.component.html',
  styleUrls: ['./sheetsitem.component.css']
})
export class SheetsitemComponent implements OnInit {
  modalRef?: BsModalRef;
  sheet? : Sheet;

  constructor(private http : HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.http.get<any>(API_URL + '/sheet/' + this.route.snapshot.paramMap.get('id'), AuthService.getJwtHeader())
    .subscribe(
      (result: any) => {
        this.sheet = result;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/sheets']);
        AppComponent.alertMsg(error.error, "warning");
      }
    );
  }

  openModalAlertDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.http.post<any>(API_URL + '/sheet/delete', this.sheet, AuthService.getJwtHeader())
    .subscribe(
      (result: any) => {
        AppComponent.alertMsg("Sheet was successfuly deleted", "danger");
        this.router.navigate(['/sheets']);
      },
      (error: HttpErrorResponse) => {
        AppComponent.alertMsg(error.error, "warning");
      }
    );
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
