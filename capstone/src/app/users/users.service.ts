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
    major?:string;
}
export const users: User[] =
[
    {name:"donovan",email:"t@t.com",password:"test",projects:['Project 1']},
    {name:"Chris Barrera",email:"chrislbarrera@gmail.com",password:"chris",projects:['Project 1', 'Project 2'], "major": "Computer Science"},
    {name:"Collin De Kalb",email:"cjdekalb@gmail.com",password:"collin",projects:['Project 3', 'Project 4'], "major": "Computer Science"},
    {name:"Xavier Sepulveda",email:"Xavier0922@gmail.com",password:"xavier",projects:['Project 5', 'Project 2'], "major": "Computer Science"},
    {name:"Shaan Barkat",email:"barkatshaan@gmail.com",password:"shaan",projects:['Project 1', 'Project 4'], "major": "Computer Science"},
    {name:"Faraz",email:"faraz.nov96@gmail.com",password:"faraz",projects:['Project 2', 'Project 5'], "major": "Computer Science"},
    {name:"Kyle Klauss",email:"k.klauss99@gmail.com",password:"kyle",projects:['Project 1', 'Project 3'], "major": "Computer Science"},

]
