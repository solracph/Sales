import { Component, OnInit, Input, Output , OnChanges, EventEmitter, ViewChild} from '@angular/core';
import { Lead } from '../../models/lead.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LeadGridService } from '../../services/lead-grid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-grid',
  templateUrl: './lead-grid.component.html',
  styleUrls: ['./lead-grid.component.scss']
})
export class LeadGridComponent implements OnInit , OnChanges {

  @Input() leads : Lead[];
  @Output() leadSelected: EventEmitter<Lead> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public dataSource: MatTableDataSource<Lead>;

  constructor(
    public leadGridService: LeadGridService,
    private router: Router
    ) { }

  ngOnInit() { }

  ngOnChanges(changes){
    this.dataSource = new MatTableDataSource(changes.leads.currentValue);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
