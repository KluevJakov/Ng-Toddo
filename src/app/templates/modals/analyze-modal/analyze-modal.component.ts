import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'analyze-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze-modal.component.html',
  styleUrls: ['./analyze-modal.component.css']
})
export class AnalyzeModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }
}
