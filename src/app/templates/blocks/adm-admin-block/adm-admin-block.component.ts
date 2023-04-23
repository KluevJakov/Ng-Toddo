import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'adm-admin-block',
  templateUrl: './adm-admin-block.component.html',
  styleUrls: ['./adm-admin-block.component.css']
})
export class AdmAdminBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
}
