import { leadsState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { adapter } from "../reducers/notes.reducer";

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

export const getAllLeadNotes = createSelector(
    getAllNotes,
    (notes, props) => { 
        return notes.filter(notes => notes.leadId == props.leadId);
    }
);