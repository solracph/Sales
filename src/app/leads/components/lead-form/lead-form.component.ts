import { Component, OnInit, Input, Output } from '@angular/core';
import { Source, Reason, Plan, Outcome } from '../../models';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {

  @Input() sources : Source[];
  @Input() reasons : Reason[];
  @Input() plans : Plan[];
  @Input() outcomes: Outcome[];

  constructor() { }

  ngOnInit() {
  }

}
