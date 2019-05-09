import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadsSelectors from '../../selectors/lead.selectors';
import * as fromNotesSelectors from '../../selectors/note.selectors';
import * as fromEventsSelectors from '../../selectors/event.selectors';
import { SelectLead, LoadLeadVersions, InsertLeadIo, LoadLeads, UpdateLead } from '../../actions/leads.actions';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { LoadAllLists } from '../../actions/lists.actions';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LeadNewNoteDialogComponent } from '../../components/lead-new-note-dialog/lead-new-note-dialog.component';
import * as _ from 'lodash'
import { LeadNewEventDialogComponent } from '../../components/lead-new-event-dialog/lead-new-event-dialog.component';
import { LeadNote } from '../../models/lead-note.model';
import { LoadNotes, InsertNoteIo } from '../../actions/notes.actions';
import { LeadEvent } from '../../models/lead-event.model';
import { LoadEvents, InsertEventIo } from '../../actions/event.actions';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

    public selectedLead$: Observable<Lead>;
    public versions$: Observable<Lead[]>;
    public state$: Observable<LeadState>;
    public sources$: Observable<Source[]>;
    public reasons$: Observable<Reason[]>;
    public plans$: Observable<Plan[]>;
    public outcomes$: Observable<Outcome[]>;
    public notes$: Observable<LeadNote[]>
    public events$: Observable<LeadEvent[]>
    public _subsc: Subscription = new Subscription();
    private masterLeads$: Observable<Lead[]>;

    constructor(
        private store: Store<fromLeads.State>,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this._subsc.add(
        this.route.params
            .subscribe((params) => {
            this.initialLoad(params['leadId']);
            })
        );
    }

    private initialLoad(leadId) {
        this.store.dispatch(new LoadLeads());
        this.store.dispatch(new LoadAllLists());
        this.store.dispatch(new LoadNotes());
        this.store.dispatch(new LoadEvents());

        this.notes$ = this.store.pipe(select(fromNotesSelectors.getAllLeadNotes , { leadId }));
        this.events$ = this.store.pipe(select(fromEventsSelectors.getAllLeadEvents , { leadId }));
        this.masterLeads$ = this.store.pipe(select(fromLeadsSelectors.getMasterLeads), filter(i => !!i.length));
        this._loadVersionsWhenEditingMasterLead(leadId, this.masterLeads$);
        this.selectedLead$ = this.store.pipe(select(fromLeadsSelectors.getSelectedLead));
        this.versions$ = this.store.pipe(select(fromLeadsSelectors.getAllLeadVersions, { leadId }));
        this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
        this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
        this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
        this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
    }

    private _loadVersionsWhenEditingMasterLead(leadId: string, masterLeads: Observable<Lead[]>) {
        this._subsc.add(
        masterLeads
            .pipe(
            take(1),
            filter((leads: Lead[]) => !!leads.find(i => i.leadId == leadId)),
            )
            .subscribe(() => {
            this.store.dispatch(new LoadLeadVersions({ leadId }));
            })
        );
    }

    onLeadSelection(lead: Lead) {
        this.store.dispatch(new SelectLead({ id: lead.versionId }));
    }

    formValueChange(lead: Lead) {
        if (lead.state == LeadState.master)
        this.store.dispatch(new UpdateLead({ id: lead.versionId, changes: { state: LeadState.edition } }));
    }

    leadSaved(lead: Lead) {
        debugger
        if (lead.state == LeadState.new) {
            this.store.dispatch(new InsertLeadIo({ insert: { ...lead } }));
        }
        else if (lead.state == LeadState.edition) {
            this.store.dispatch(new InsertLeadIo({
            insert: {
                ...lead,
                versionId: uuid(),
                versionDate: new Date()
            },
            update: {
                id: lead.versionId,
                changes: {
                state: LeadState.version
                }
            }
            }));
        }
    }

    newNoteDialog(): void {
        const dialogRef = this.dialog.open(LeadNewNoteDialogComponent);
        dialogRef.afterClosed().subscribe((text: string ) => {
            if(text){
                this._subsc.add(
                    this.selectedLead$.subscribe( lead => {
                        if(!!lead)
                        this.store.dispatch(new InsertNoteIo({  
                                noteId: uuid(), 
                                leadId: lead.leadId, 
                                text: text, 
                                date: new Date(), 
                                userName: lead.firstName 
                            }))
                    })
                );
            };
        });
    }

    newEventDialog(){
        const dialogRef = this.dialog.open(LeadNewEventDialogComponent,{
            data: { outcomes: this.outcomes$ }
        });
        dialogRef.afterClosed().subscribe( (event : LeadEvent) => {
            if(event){
                this._subsc.add(
                    this.selectedLead$.subscribe( lead => {
                        if(!!lead)
                        this.store.dispatch(new InsertEventIo(
                            { ...event,
                                eventId: uuid(),
                                leadId: lead.leadId, 
                                userName: lead.firstName,
                            }
                        ))
                    })
                );
            }
        })
    }

    ngOnDestroy() {
        this._subsc.unsubscribe();
        this.store.dispatch(new SelectLead({id : null}));
    }
}
