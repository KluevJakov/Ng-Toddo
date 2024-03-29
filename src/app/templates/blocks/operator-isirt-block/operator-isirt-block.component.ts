import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { IncidentModalComponent } from '../../modals/incident-modal/incident-modal.component';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'operator-isirt-block',
  templateUrl: './operator-isirt-block.component.html',
  styleUrls: ['./operator-isirt-block.component.css']
})
export class OperatorIsirtBlockComponent {
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
}
