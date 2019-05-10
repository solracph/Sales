import { Component, OnInit } from '@angular/core';
import { UserblockService } from './userblock.service';
import { Store, select } from '@ngrx/store';
import * as fromAccount from '../../../account/reducers';
import * as fromUserSelectors from '../../../account/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../../account//models/user.model';
import { Role } from '../../../account/models/roles.enum';
import { Login } from '../../../account//actions/user.actions';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    users$: Observable<User>;
    user: User;
    constructor(
        public userblockService: UserblockService,
        private store: Store<fromAccount.State>
    ) {

        this.users$ = this.store.pipe(select(fromUserSelectors.getUser));
    }

    ngOnInit() {
        
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

    toggleUser(){
        this.users$.subscribe( (user : User) => {
            this.user = user;
        })
        if(this.user.role == Role.Agent)
            {
               
                this.store.dispatch(new Login([{
                    userId: uuid(),
                    name: "Jon",
                    isAuthenticated: true,
                    picture: "assets/img/user/02.jpg",
                    role: Role.Manager
                }]))
            } else {
                this.store.dispatch(new Login([{
                    userId: uuid(),
                    name: "Ana",
                    isAuthenticated: true,
                    picture: "assets/img/user/01.jpg",
                    role: Role.Agent
                }]))
            }
    }

}
