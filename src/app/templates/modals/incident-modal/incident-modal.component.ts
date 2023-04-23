import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'incident-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-modal.component.html',
  styleUrls: ['./incident-modal.component.css']
})
export class IncidentModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }
}
