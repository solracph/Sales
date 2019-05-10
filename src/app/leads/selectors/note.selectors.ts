import { leadsState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { adapter } from "../reducers/notes.reducer";
import { LeadNote } from '../models/lead-note.model';

export const getNotesState = createSelector(
    leadsState,
    state => state.notes
);

export const {
    selectIds: getNoteIds,
    selectEntities: getNoteEntities,
    selectAll: getAllNotes,
    selectTotal: getTotalNote,
} = adapter.getSelectors(getNotesState);

export const getAllNotesSortByDate = createSelector(
    getAllNotes,
    (events: LeadNote[]) => { 
        return events.sort(function(a: LeadNote,b: LeadNote){ 
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
    }
);

export const getAllLeadNotes = createSelector(
    getAllNotesSortByDate,
    (notes, props) => { 
        return notes.filter(notes => notes.leadId == props.leadId);
    }
);

export const getAllLeadNotesByVersion = createSelector(
    getAllNotesSortByDate,
    (notes, props) => { 
        return notes.filter(notes => notes.versionId == props.versionId);
    }
);