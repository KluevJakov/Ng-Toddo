import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { PolicyViewModalComponent } from '../../modals/policy-view-modal/policy-view-modal.component';
import { ReportModalComponent } from '../../modals/report-modal/report-modal.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'user-profile-block',
  templateUrl: './user-profile-block.component.html',
  styleUrls: ['./user-profile-block.component.css']
})
export class UserProfileBlockComponent implements OnInit {

  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  policyViewModal() {
    const modalRef = this.modalService.open(PolicyViewModalComponent, { fullscreen: true, scrollable: true });
    //modalRef.componentInstance.ticket = ticket;
    //modalRef.result.then((result) => { if (result) { this.tickets() } });
  }

  reportModal() {
    const modalRef = this.modalService.open(ReportModalComponent, { fullscreen: true, scrollable: true });
    modalRef.componentInstance.user = this.user;
    //modalRef.result.then((result) => { if (result) { this.tickets() } });
  }

}
