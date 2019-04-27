import { Component, OnInit, Input, Output , OnChanges, EventEmitter} from '@angular/core';
import { Lead } from '../../models/lead.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lead-grid',
  templateUrl: './lead-grid.component.html',
  styleUrls: ['./lead-grid.component.scss']
})
export class LeadGridComponent implements OnInit , OnChanges {

  @Input() leads : Lead[];
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();

  public dataSource: MatTableDataSource<Lead>;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes){
    this.dataSource = new MatTableDataSource(changes.leads.currentValue);
  }

  onLeadSelection(lead: Lead){
    this.leadSelected.emit(lead);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
