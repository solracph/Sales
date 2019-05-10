import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const LOGIN = '[account] LOGIN';
export const LOGIN_IO = '[account] LOGIN IO';
export const LOGIN_IO_SUCCESS = '[account] LOGIN IO SUCCESS';
export const LOGIN_IO_FAIL = '[account] LOGIN IO FAIL';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: User[] ){}
}

export class LoginIo implements Action {
    readonly type = LOGIN_IO;
    constructor(public payload: User ){}
}

export class LoginIoSuccess implements Action {
    readonly type = LOGIN_IO_SUCCESS;
    constructor(public payload: User ){}
}

export class LoginIoFail implements Action {
    readonly type = LOGIN_IO_FAIL;
    constructor(public payload: any ){}
}


export type Actions = 
| Login
| LoginIo
| LoginIoSuccess
| LoginIoFail;
