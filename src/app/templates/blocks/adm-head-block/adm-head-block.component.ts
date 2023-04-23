import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { EmployeeModalComponent } from '../../modals/employee-modal/employee-modal.component';
import { IncidentModalComponent } from '../../modals/incident-modal/incident-modal.component';
import { AnalyzeModalComponent } from '../../modals/analyze-modal/analyze-modal.component';
import { ArchiveModalComponent } from '../../modals/archive-modal/archive-modal.component';
import { LogModalComponent } from '../../modals/log-modal/log-modal.component';
import { SettingsModalComponent } from '../../modals/settings-modal/settings-modal.component';

@Component({
  selector: 'adm-head-block',
  templateUrl: './adm-head-block.component.html',
  styleUrls: ['./adm-head-block.component.css']
})
export class AdmHeadBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  employee() {
    const modalRef = this.modalService.open(EmployeeModalComponent, { fullscreen: true });
  }

  incidents() {
    const modalRef = this.modalService.open(IncidentModalComponent, { fullscreen: true });
  }

  analyze() {
    const modalRef = this.modalService.open(AnalyzeModalComponent, { fullscreen: true });
  }

  archive() {
    const modalRef = this.modalService.open(ArchiveModalComponent, { fullscreen: true });
  }

  logs() {
    const modalRef = this.modalService.open(LogModalComponent, { fullscreen: true });
  }

  settings() {
    const modalRef = this.modalService.open(SettingsModalComponent, { fullscreen: true });
  }
}
