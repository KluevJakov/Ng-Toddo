import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { Message } from 'src/app/models/message';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() user!: User;
  public task!: Task;

  constructor(private http : HttpClient,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.task = new Task({});
  }

  report() {
    this.task.reporter = this.user;
    console.log(this.task);
    this.http.post<any>(API_URL + '/tasks/create', this.task, AuthService.getJwtHeaderJSON())
      .subscribe({
        error: this.handleError.bind(this),
        next: this.createTaskCallback.bind(this)
      });
  }

  handleError(error : HttpErrorResponse) {
    AppComponent.alertMsg(error.error, "warning");
  }

  createTaskCallback(message : Message) {
    AppComponent.alertMsg(message.message, "success");
    this.close();
  }

  close() {
    this.activeModal.dismiss();
  }
}
