import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';
import { StageModalComponent } from '../stage-modal/stage-modal.component';
import { User } from 'src/app/models/user';

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
  currentUser!: User;

  constructor(private http: HttpClient,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = AuthService.getCurrentUserObject();
    this.initTasks();
  }

  initTasks() {
    if ([1,2,3,5].includes(this.currentUser.department.id)) {
      this.http.get<any>(API_URL + '/tasks/events', AuthService.getJwtHeaderJSON())
        .subscribe({
          next: this.getEvents.bind(this)
        });
    }
      
    if ([1,2,3,5].includes(this.currentUser.department.id)) {
      this.http.get<any>(API_URL + '/tasks/stageI', AuthService.getJwtHeaderJSON())
        .subscribe({
          next: this.getStageI.bind(this)
        });
    }

    if ([1,2,3,5,6].includes(this.currentUser.department.id)) {
      this.http.get<any>(API_URL + '/tasks/stageII', AuthService.getJwtHeaderJSON())
        .subscribe({
          next: this.getStageII.bind(this)
        });
    }

    if ([1,2,3,5,7].includes(this.currentUser.department.id)) {
      this.http.get<any>(API_URL + '/tasks/stageIII', AuthService.getJwtHeaderJSON())
        .subscribe({
          next: this.getStageIII.bind(this)
        });
    }
  }

  getEvents(tasks: Array<Task>) {
    this.tasks0 = tasks;
  }

  getStageI(tasks: Array<Task>) {
    this.tasks1 = tasks;
  }

  getStageII(tasks: Array<Task>) {
    this.tasks2 = tasks;
  }

  getStageIII(tasks: Array<Task>) {
    this.tasks3 = tasks;
  }

  openStageModal(task: Task) {
    const modalRef = this.modalService.open(StageModalComponent, { fullscreen: true, scrollable: true });
    modalRef.componentInstance.task = task;
    modalRef.result.then(() => {
      this.initTasks();
    }).catch(e => {
      this.initTasks();
    });
  }

  close() {
    this.activeModal.dismiss();
  }
}
