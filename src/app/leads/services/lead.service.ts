import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Lead } from '../models';

@Injectable()
export class LeadService {

  constructor(private _http: HttpClient) { }

  gteLeads(): Observable<Lead[]> {
    return this._http.get<any>(`${environment.apiUrl}leads.json`);
  }

}
