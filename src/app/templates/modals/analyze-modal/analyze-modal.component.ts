import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Stat } from 'src/app/models/stat';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'analyze-modal',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './analyze-modal.component.html',
  styleUrls: ['./analyze-modal.component.css']
})
export class AnalyzeModalComponent {

  data!: Array<Stat>;

  constructor(private http: HttpClient,
    private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.http.get<any>(API_URL + '/tasks/stats', AuthService.getJwtHeaderJSON())
      .subscribe({
        next: this.getEvents.bind(this)
      });
  }

  getEvents(tasks: Array<Stat>) {
    this.data = tasks;
  }

  close() {
    this.activeModal.dismiss();
  }
}
