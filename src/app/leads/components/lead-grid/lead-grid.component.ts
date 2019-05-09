import { Component, OnInit, Input, Output , OnChanges, EventEmitter, ViewChild} from '@angular/core';
import { Lead } from '../../models/lead.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LeadGridService } from '../../services/lead-grid.service';
import { Router } from '@angular/router';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome, Source } from '../../models';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead-grid',
  templateUrl: './lead-grid.component.html',
  styleUrls: ['./lead-grid.component.scss']
})
export class LeadGridComponent implements OnInit , OnChanges {

  @Input() leads : Lead[];
  @Input() outcomes : Outcome[];
  @Input() sources : Source[];
  @Input() lastLeadEvents : LeadEvent[];
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public dataSource: MatTableDataSource<Lead>;

  constructor(
    public leadGridService: LeadGridService,
    public leadService: LeadService,
    private router: Router
  ) { }

  ngOnInit() { 
  }

  ngOnChanges(changes){
    if(!!changes.leads){
      this.dataSource = new MatTableDataSource(changes.leads.currentValue);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  getEvetDate(leadId){
    let date
    this.lastLeadEvents.forEach((event: LeadEvent) => {
        if(event.leadId == leadId) {
          date = event.date;
          return
        }
    });
    return date;
  }

  getEvetOutcome(leadId){
    let outcome
    this.lastLeadEvents.forEach((event: LeadEvent) => {
        if(event.leadId == leadId) {
          outcome = this.leadService.getListDescription(this.outcomes,event.outcome);
          return
        }
    });
    return outcome;
  }

  onLeadSelection(lead: Lead){
    this.leadSelected.emit(lead);
  }

  applyFilter(filterValue: string) {
    this.leadGridService.applyFilterToDataSource(filterValue,this.dataSource);
  }

  newLead(){
    debugger
    this.router.navigate(['/leads/new']);
  }
}
