import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, interval } from 'rxjs';
import { Log } from 'src/app/models/log';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'log-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.css']
})
export class LogModalComponent {
  logs!: Array<Log>;
  currentDate!: string;
  subscription!: Subscription;

  constructor(private http : HttpClient, private activeModal: NgbActiveModal) {
    let date = new Date();
    let day = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
    let month = date.getDate() < 10 ? '0'+date.getDate().toString() : date.getDate().toString();
    this.currentDate = date.getFullYear() + "-" + day + "-" + month;
  }

  ngOnInit(): void {
    this.getLogs();

    this.subscription = interval(10000).subscribe(x => {
      if (this.http) {
        this.getLogs();
      }
    });
  }

  getLogs() {
    this.http.get<any>(API_URL + '/logs?date='+this.currentDate, AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.loadLogs.bind(this),
      });
  }

  loadLogs(logs : Array<Log>) {
    this.logs = logs;
  }

  close() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
