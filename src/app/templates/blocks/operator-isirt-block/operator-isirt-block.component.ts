import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'operator-isirt-block',
  templateUrl: './operator-isirt-block.component.html',
  styleUrls: ['./operator-isirt-block.component.css']
})
export class OperatorIsirtBlockComponent {
  @Input() user!: User;

  constructor(private http : HttpClient,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
}
