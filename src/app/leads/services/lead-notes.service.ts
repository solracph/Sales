import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LeadNote } from '../models/lead-note.model';

@Injectable()
export class NotesService {

  constructor(private _http: HttpClient) { }

  getNotes(): Observable<LeadNote[]> {
    return this._http.get<any>(`${environment.apiUrl}notes.json`);
  }
}
