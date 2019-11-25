import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    getUser(email:string): User 
    {
        return users.find(user => user.email == email);
    }
    getUsersProject(project:string): any[]
    {
        console.log(`userservice: finding users for project: ${project}`);
        return users.filter(user => {
                if ( user.projects.includes(project) ) return true;
                return false;
          });
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
    name:string;
    email:string;
    password:string;
    projects:string[];
}
export const users: User[] =
[
    {name:"donovan",email:"t@t.com",password:"test",projects:['Project 1']}

]
