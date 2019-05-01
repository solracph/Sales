import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Lead } from '../models';
import { map } from 'lodash';
import { Upsert } from '../models/upsert.model';

@Injectable()
export class LeadService {

  constructor(private _http: HttpClient) { }

  getLeads(): Observable<Lead[]> {
    return this._http.get<Lead[]>(`${environment.apiUrl}leads.json`);
  }

  getLeadVersions(LeadId: string): Observable<Lead[]> {
    //TODO This is only for one version for now :)
    return this._http.get<Lead[]>(`${environment.apiUrl}versions.json`);
  }

  insertLead(lead: Upsert){
    return of(lead);
  }

}
