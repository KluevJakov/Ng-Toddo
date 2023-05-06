import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'incident-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-modal.component.html',
  styleUrls: ['./incident-modal.component.css']
})
export class IncidentModalComponent {
  tasks0!: Array<Task>;
  tasks1!: Array<Task>;
  tasks2!: Array<Task>;
  tasks3!: Array<Task>;

  constructor(private http: HttpClient,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initTasks();
  }

  initTasks() {
    this.http.get<any>(API_URL + '/tasks/', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.getAndSortTasks.bind(this)
      });
  }

  getAndSortTasks(tasks: Array<Task>) {
    this.tasks0 = tasks;
  }

  close() {
    this.activeModal.dismiss();
  }
}
