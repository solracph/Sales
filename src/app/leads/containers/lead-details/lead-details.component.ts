import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLeads from '../../reducers/leads.reducer';
import * as fromListSelectors from '../../selectors/list.selectors';
import * as fromLeadSelectors from '../../selectors/lead.selectors';
import * as fromNoteSelectors from '../../selectors/note.selectors';
import * as fromEventSelectors from '../../selectors/event.selectors';
import * as fromUserSelectors from '../../../account/selectors/user.selectors';
import { SelectLead, LoadLeadVersions, InsertLeadIo, LoadLeads, UpdateLead } from '../../actions/leads.actions';
import { Source, Reason, Plan, Outcome, Lead } from '../../models';
import { LeadState } from '../../models/lead-state.enum';
import { LoadAllLists } from '../../actions/lists.actions';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { filter, take, debounce, map, first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LeadNewNoteDialogComponent } from '../../components/lead-new-note-dialog/lead-new-note-dialog.component';
import { LeadNewEventDialogComponent } from '../../components/lead-new-event-dialog/lead-new-event-dialog.component';
import { LeadNote } from '../../models/lead-note.model';
import { LoadNotes, InsertNoteIo } from '../../actions/notes.actions';
import { LeadEvent } from '../../models/lead-event.model';
import { LoadEvents, InsertEventIo, UpdateEvent, UpdateEventIo } from '../../actions/event.actions';
import { User } from '../../../account/models/user.model';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

    private masterLeads$: Observable<Lead[]>;
    public selectedLead$: Observable<Lead>;
   
    public versions$: Observable<Lead[]>;
    public state$: Observable<LeadState>;
    public sources$: Observable<Source[]>;
    public reasons$: Observable<Reason[]>;
    public plans$: Observable<Plan[]>;
    public outcomes$: Observable<Outcome[]>;
    public notes$: Observable<LeadNote[]>;
    public events$: Observable<LeadEvent[]>;
    public user$ : Observable<User>;
    public _subsc: Subscription = new Subscription();
    public _lead: Lead;
    public _user: User;
   

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

        this.masterLeads$ = this.store.pipe(select(fromLeadSelectors.getMasterLeads), filter(i => !!i.length));
        this._loadVersionsWhenEditingMasterLead(leadId, this.masterLeads$);
        this.selectedLead$ = this.store.pipe(select(fromLeadSelectors.getSelectedLead));
        this._loadNotesAndEvents(this.selectedLead$);
        this.versions$ = this.store.pipe(select(fromLeadSelectors.getAllLeadVersions, { leadId }));
        this.sources$ = this.store.pipe(select(fromListSelectors.getSources));
        this.reasons$ = this.store.pipe(select(fromListSelectors.getReasons));
        this.plans$ = this.store.pipe(select(fromListSelectors.getPlans));
        this.outcomes$ = this.store.pipe(select(fromListSelectors.getOutcomes));
        this.user$ = this.store.pipe(select(fromUserSelectors.getUser));

        this.user$.subscribe((user: User) => {
            this._user = user;
        })
        this.selectedLead$.subscribe((lead: Lead) => {
            this._lead = lead;
        })
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

    private _loadNotesAndEvents(selectedLead: Observable<Lead>){
        this._subsc.add(
            selectedLead.subscribe((lead) =>{
                if(!!lead)
                if(lead.state == 3){
                    this.events$ =  this.store.pipe(select(fromEventSelectors.getAllLeadEventsByVersion , { versionId: lead.versionId }));
                    this.notes$ = this.store.pipe(select(fromNoteSelectors.getAllLeadNotesByVersion , { versionId: lead.versionId }));
                }else{
                    this.events$ =  this.store.pipe(select(fromEventSelectors.getAllLeadEvents , { leadId: lead.leadId }));
                    this.notes$ = this.store.pipe(select(fromNoteSelectors.getAllLeadNotes , { leadId: lead.leadId }));
                }
            })
        )
    }

    onLeadSelection(lead: Lead) {
        this.store.dispatch(new SelectLead({ id: lead.versionId }));
    }

    formValueChange(lead: Lead) {
        if (lead.state == LeadState.master)
        this.store.dispatch(new UpdateLead({ id: lead.versionId, changes: { state: LeadState.edition } }));
    }

    leadSaved(lead: Lead) {
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
                this.store.dispatch(new InsertNoteIo({  
                    noteId: uuid(), 
                    leadId: this._lead.leadId, 
                    versionId: this._lead.versionId,
                    text: text, 
                    date: new Date(), 
                    userName: this._user.name
                }))
            };
        });
    }

    newEventDialog(){
        const dialogRef = this.dialog.open(LeadNewEventDialogComponent,{
            data: { outcomes: this.outcomes$ }
        });
        dialogRef.afterClosed().subscribe( (event : LeadEvent) => {
            if(event){
                this.store.dispatch(new InsertEventIo(
                    { ...event,
                        eventId: uuid(),
                        leadId: this._lead.leadId, 
                        versionId: this._lead.versionId,
                        userName: this._user.name,
                    }
                ))
            }
        })
    }

    editEventDialog(event : LeadEvent){
       const dialogRef = this.dialog.open(LeadNewEventDialogComponent,{
        data:  { outcomes: this.outcomes$, event }  
        });
        dialogRef.afterClosed().subscribe( (event : LeadEvent) => {
            if(event){
                this.store.dispatch(new UpdateEventIo(event))
            }
        })
    }

    ngOnDestroy() {
        this._subsc.unsubscribe();
        this.store.dispatch(new SelectLead({id : null}));
    }
}
