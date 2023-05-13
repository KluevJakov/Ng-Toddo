import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { Message } from 'src/app/models/message';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'stage-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stage-modal.component.html',
  styleUrls: ['./stage-modal.component.css']
})
export class StageModalComponent {

  @Input() task!: Task;
  currentUser!: User;
  
  constructor(private http : HttpClient,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.currentUser = AuthService.getCurrentUserObject();
  }

  process(stage: number) {
    if (stage == 3 && this.task.regNumber == null) {
      AppComponent.alertMsg("Укажите номер инцидента", "warning");
      return;
    }
    this.task.stage.id = stage;
    this.http.post<any>(API_URL + '/tasks/process', this.task, AuthService.getJwtHeaderJSON())
    .subscribe({
      error: this.handleError.bind(this),
      next: this.processTaskCallback.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    if (this.task.stage.id == 3) {
      this.task.stage.id--;
    }
    AppComponent.alertMsg(error.error, "warning");
  }

  processTaskCallback(message : Message) {
    AppComponent.alertMsg(message.message, "success");
    this.close();
  }

  close() {
    this.activeModal.dismiss();
  }
}
