import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { IncidentModalComponent } from '../../modals/incident-modal/incident-modal.component';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Message } from 'src/app/models/message';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'operator-audit-block',
  templateUrl: './operator-audit-block.component.html',
  styleUrls: ['./operator-audit-block.component.css']
})
export class OperatorAuditBlockComponent {
  @Input() user!: User;
  notifyCount!: number;
  subscription!: Subscription;

  constructor(private http : HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {}

  incidents() {
    const modalRef = this.modalService.open(IncidentModalComponent, { fullscreen: true });
  }
}
