import { Injectable } from "@angular/core";
import { EventsService } from "../services/lead-events.service";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from "rxjs/operators";
import * as fromEvent from '../actions/event.actions';
import { LeadEvent } from "../models/lead-event.model";

@Injectable()
export class EventEffects {

    constructor(
        private eventsService: EventsService,
        private actions$: Actions
    ) { }

    @Effect()
    loadEvents$ = this.actions$.pipe(
      ofType<fromEvent.LoadEvents>(fromEvent.LOAD_EVENTS),
      switchMap(() => this.eventsService.getEvents()
        .pipe(
          map((events: LeadEvent[]) => new fromEvent.LoadEventsSuccess(events)),
          catchError(error => of(new fromEvent.LoadEventsFail(error)))
        )
      )
    );

    @Effect()
    insertEventIo$ = this.actions$.pipe(
      ofType<fromEvent.InsertEventIo>(fromEvent.INSERT_EVENT_IO),
      map(action => action.payload),
      switchMap((note) => this.eventsService.insertEvent(note)
        .pipe(
          map((note: LeadEvent) => new fromEvent.InsertEventIoSuccess(note)),
          catchError(error => of(new fromEvent.InsertEventIoFail(error)))
        )
      ),
    );

    @Effect()
    insertEventIoSuccess$ = this.actions$.pipe(
      ofType<fromEvent.InsertEventIoSuccess>(fromEvent.INSERT_EVENT_IO_SUCCESS),
      map(action => action.payload),
        map((note) => new fromEvent.InsertEvent(note))
    );

}