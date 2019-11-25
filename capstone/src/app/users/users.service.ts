import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    getUser(email:string): User 
    {
        return users.find(user => user.email == email);
    }
    authLogin(email:string,password:string):boolean
    {
        console.log('in authlogin');
        const found = users.find(user => 
        {
          if (user.email !== email) return false;
          if (user.password !== password) return false;
          return true;
        });

        if (typeof found == "undefined")
        {
            console.log('no user found');
            return false;
        }
        console.log(`user object found ${found.email} setting user object`);
        localStorage.setItem("user", email);
        return true;  
    }

  constructor() { }
}
export interface User 
{
    email:string;
    password:string;
}
export const users: User[] =
[
    {email:"t@t.com",password:"test"}

]
