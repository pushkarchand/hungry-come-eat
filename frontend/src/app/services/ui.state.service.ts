import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class UIStateService{

    public user = new BehaviorSubject<User>(null);
    castUser = this.user.asObservable();

    private  logedIn= new BehaviorSubject<boolean>(false);
    castLogedIn = this.logedIn.asObservable();
    constructor(){
        this.getUserDetails();
    }

    public get currentUserValue(): User {
        return this.user.value;
    }

    public get userLogedIn(): boolean {
        return this.logedIn.value;
    }

    // method to get user details like id,username and role
    public getUserDetails(){
        const token=localStorage.getItem("authtoken");
        const userInstance=new User('','','');
        // check if token exist in the local storage
        if(token){
            const decodedToken=this.getDecodedAccessToken(token);
            // check if decoded token value has required values
            if(decodedToken && decodedToken.userId && decodedToken.userName && decodedToken.role){
                userInstance.id=decodedToken.userId;
                userInstance.role=decodedToken.role;
                userInstance.userName=decodedToken.userName;
                this.editUser(userInstance);
                this.editLogedIn(true);
            } else{
                this.editUser(userInstance);
                this.editLogedIn(false);
            }
        } else{
            this.editUser(userInstance);
            this.editLogedIn(false);
        }
    }
    
    editUser(newUser){
        this.user.next(newUser); 
    }

    editLogedIn(argLogedIn){
        this.logedIn.next(argLogedIn); 
    }


    //  Method to decode token
    private getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

}