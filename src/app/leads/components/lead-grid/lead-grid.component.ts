import { Component, OnInit, Input, Output , OnChanges, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';
import { Lead } from '../../models/lead.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LeadGridService } from '../../services/lead-grid.service';
import { Router } from '@angular/router';
import { LeadEvent } from '../../models/lead-event.model';
import { Outcome, Source } from '../../models';
import { LeadListsService } from '../../services/lead-lists.service';

@Component({
  selector: 'app-lead-grid',
  templateUrl: './lead-grid.component.html',
  styleUrls: ['./lead-grid.component.scss']
})
export class LeadGridComponent implements OnInit , OnChanges {

  @Input() leads : Lead[];
  @Input() outcomes : Outcome[];
  @Input() sources : Source[];
  @Input() filter : Source[];
  @Input() lastEvents : LeadEvent[];
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public dataSource: MatTableDataSource<Lead> = new MatTableDataSource([]);

  constructor(
    public leadGridService: LeadGridService,
    public listsService: LeadListsService,
    private router: Router
  ) { }

  ngOnInit() { 
  }

  ngOnChanges(changes){
    if(!!changes.leads){
        let mergedDataSource = [];
        changes.leads.currentValue.forEach((lead: Lead) => {
          mergedDataSource.push({
            ...lead, 
            outcome: this.getEvetOutcome(lead.leadId),
            source: this.listsService.getListDescription(this.sources,lead.source),
            outcomeDate: this.getEvetDate(lead.leadId)
          })
        });

        this.dataSource = new MatTableDataSource(mergedDataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    if(!!changes.filter){
      this.applyFilter(changes.filter.currentValue);
    }
  }

  getEvetDate(leadId){
    let date
    this.lastEvents.forEach((event: LeadEvent) => {
        if(event.leadId == leadId) {
          date = event.date;
          return
        }
    });
    return date;
  }

  getEvetOutcome(leadId){
    let outcome
    this.lastEvents.forEach((event: LeadEvent) => {
        if(event.leadId == leadId) {
          outcome = this.listsService.getListDescription(this.outcomes,event.outcome);
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
    this.router.navigate(['/leads/new']);
  }
}
