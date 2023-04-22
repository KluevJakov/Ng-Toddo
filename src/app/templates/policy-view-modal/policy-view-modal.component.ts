import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'policy-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-view-modal.component.html',
  styleUrls: ['./policy-view-modal.component.css']
})
export class PolicyViewModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }
}
