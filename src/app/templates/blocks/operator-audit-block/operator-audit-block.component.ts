import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'operator-audit-block',
  templateUrl: './operator-audit-block.component.html',
  styleUrls: ['./operator-audit-block.component.css']
})
export class OperatorAuditBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
}
