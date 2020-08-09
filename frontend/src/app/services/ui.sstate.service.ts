import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';

@Injectable()
export class UIStateService{
    private user = new BehaviorSubject<User>(null);
    castUser = this.user.asObservable();

    private  logedIn= new BehaviorSubject<Boolean>(false);
    castLogedIn = this.logedIn.asObservable();
    constructor(){
        //   parse token and validate user
    }
    
    editUser(newUser){
        this.user.next(newUser); 
    }

    editLogedIn(argLogedIn){
        
        this.logedIn.next(argLogedIn); 
    }

}