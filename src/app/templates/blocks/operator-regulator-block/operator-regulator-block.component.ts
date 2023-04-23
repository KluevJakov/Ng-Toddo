import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'operator-regulator-block',
  templateUrl: './operator-regulator-block.component.html',
  styleUrls: ['./operator-regulator-block.component.css']
})
export class OperatorRegulatorBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
}
