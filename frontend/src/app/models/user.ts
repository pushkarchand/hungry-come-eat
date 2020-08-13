export class User{
    constructor(public id:string,
    public userName:string,
    public role:string){}
}

export class UserDetails{
    constructor(public address:string,
    public email:string,
    public firstName:string,
    public lastName:string,
    public mobile:string,
    public postalCode:string,
    public role:string,
    public userName:string,
    public _id:string){

    }
}