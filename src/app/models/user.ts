import { Roles } from "./roles";

export class User {
    id?:number;
    email?:string;
    fullname?:string;
    username?:string;
    password?:string;
    phone?:string;
    status?:boolean;
    userRoles?: Roles[];
}    