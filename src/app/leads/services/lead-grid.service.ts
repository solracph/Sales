import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Lead } from '../models';

@Injectable()
export class LeadGridService {

    applyFilterToDataSource(filterValue: string, dataSource: MatTableDataSource<Lead>){
        dataSource.filter = filterValue;
    }
}
