import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { EmployeeModalComponent } from '../../modals/employee-modal/employee-modal.component';
import { IncidentModalComponent } from '../../modals/incident-modal/incident-modal.component';
import { AnalyzeModalComponent } from '../../modals/analyze-modal/analyze-modal.component';
import { ArchiveModalComponent } from '../../modals/archive-modal/archive-modal.component';
import { LogModalComponent } from '../../modals/log-modal/log-modal.component';
import { SettingsModalComponent } from '../../modals/settings-modal/settings-modal.component';
import { Message } from 'src/app/models/message';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Subscription, interval } from 'rxjs';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'adm-head-block',
  templateUrl: './adm-head-block.component.html',
  styleUrls: ['./adm-head-block.component.css']
})
export class AdmHeadBlockComponent {
  @Input() user!: User;
  notifyCount!: number;
  subscription!: Subscription;

  constructor(private http : HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getNotifyCount();

    this.subscription = interval(10000).subscribe(x => {
      if (this.http) {
        this.getNotifyCount();
      }
    });
  }

  getNotifyCount() {
    this.http.get<any>(API_URL + '/tasks/notifyCount', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.refreshNotify.bind(this),
        error: this.handleError.bind(this)
      });
  }

  handleError(error : HttpErrorResponse) {
    console.log(error.error);
  }

  refreshNotify(notifyCount : Message) {
    this.notifyCount = parseInt(notifyCount.message);
  }

  incidents() {
    const modalRef = this.modalService.open(IncidentModalComponent, { fullscreen: true });
  }

  employee() {
    const modalRef = this.modalService.open(EmployeeModalComponent, { fullscreen: true });
  }

  analyze() {
    const modalRef = this.modalService.open(AnalyzeModalComponent, { fullscreen: true });
  }

  archive() {
    const modalRef = this.modalService.open(ArchiveModalComponent, { fullscreen: true });
  }

  logs() {
    const modalRef = this.modalService.open(LogModalComponent, { fullscreen: true, scrollable: true });
  }

  settings() {
    const modalRef = this.modalService.open(SettingsModalComponent, { fullscreen: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
