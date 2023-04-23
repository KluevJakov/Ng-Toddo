import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'archive-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }
}
