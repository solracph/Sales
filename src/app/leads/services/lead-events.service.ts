import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LeadEvent } from '../models/lead-event.model';

@Injectable()
export class EventsService {

  constructor(private _http: HttpClient) { }

  getEvents(): Observable<LeadEvent[]> {
    return this._http.get<any>(`${environment.apiUrl}events.json`);
  }

  insertEvent(lead: LeadEvent){
    return of(lead);
  }
}
