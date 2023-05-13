import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';
import { StageModalComponent } from '../stage-modal/stage-modal.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'archive-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent {
  tasks!: Array<Task>;
  constructor(private http : HttpClient,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.http.get<any>(API_URL + '/tasks/archive', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.getTasks.bind(this)
      });
  }

  openStageModal(task: Task) {
    const modalRef = this.modalService.open(StageModalComponent, { fullscreen: true, scrollable: true });
    modalRef.componentInstance.task = task;
  }

  getTasks(tasks: Array<Task>) {
    this.tasks = tasks;
  }

  close() {
    this.activeModal.dismiss();
  }
}
