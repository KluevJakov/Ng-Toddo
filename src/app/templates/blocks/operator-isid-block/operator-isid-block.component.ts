import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { IncidentModalComponent } from '../../modals/incident-modal/incident-modal.component';

const API_URL: string = environment.apiUrl;


@Component({
  selector: 'operator-isid-block',
  templateUrl: './operator-isid-block.component.html',
  styleUrls: ['./operator-isid-block.component.css']
})
export class OperatorIsidBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  incidents() {
    const modalRef = this.modalService.open(IncidentModalComponent, { fullscreen: true });
  }
}
