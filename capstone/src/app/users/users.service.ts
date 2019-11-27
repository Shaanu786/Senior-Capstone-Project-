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
      fetch('http://localhost:3001/login', {
      "method":"post",
      "headers": {
        "Content-Type":"application/json"
      },
      "body":JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        return true;
      })
      .catch(response => {
        alert('Incorrect login credentials. Please try again.');
      })
      return false;
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
