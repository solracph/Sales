import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Outcome, Reason, Source } from '../models';

@Injectable()
export class LeadListsService {

  constructor(private _http: HttpClient) { }

  getSources(): Observable<Source[]> {
    return this._http.get<any>(`${environment.apiUrl}sources.json`);
  }

  getOutcomes(): Observable<Outcome[]> {
    return this._http.get<any>(`${environment.apiUrl}outcomes.json`);
  }

  getReasons(): Observable<Reason[]> {
    return this._http.get<any>(`${environment.apiUrl}reasons.json`);
  }

  getPlans(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}plans.json`);
  }

  getListDescription(array,id){
    let result =  this.filterById(array,id)
    return result != null ? result.description : '';
  }

  private filterById(array, filter){
      return ( 
          array != undefined 
          && array != null 
          && array.length > 0 
          && filter != null 
          && filter != undefined
      )
      ? array.filter(r => r.id == filter)[0] 
      : null;
  }
}
