import { Injectable } from '@angular/core';

@Injectable()
export class LeadViewService {

    getDescription(array,id){
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
