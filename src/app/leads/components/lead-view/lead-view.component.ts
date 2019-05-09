import { Component, OnInit, Input } from '@angular/core';
import { Lead, Source, Reason, Plan, Outcome } from '../../models';
import { LeadService } from '../../services/lead.service';
import { LeadListsService } from '../../services/lead-lists.service';

@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {

  @Input() lead: Lead;
  @Input() sources : Source[];
  @Input() reasons : Reason[];
  @Input() plans : Plan[];
  @Input() outcomes: Outcome[];
  
  constructor(public listService: LeadListsService) { }

  ngOnInit() {
  }


}
