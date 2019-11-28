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
        //console.log(`userservice: finding users for project: ${project}`);
        console.log("in get user tasks")
        return users.filter(user => {
                if ( user.projects.includes(project) ) { 
                  console.log("Passed project", project);
                  console.log("GetUsersProjects", user.projects);
                  return true;
                }
                console.log("Passed project", project);
                console.log("GetUsersProjects", user.projects);
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

  constructor() {
  }

  // async ngoninit() {
  //   await this.fetchUsers();
  // }
  
  async fetchUsers() {
    console.log("Before fetch");
    //const { id } = JSON.parse(sessionStorage.getItem('user'));
    return fetch(`http://localhost:3001/user`)
        .then(res => res.json())
        .then(({ data }) => {
          console.log("In fetchUsers()", data);
            users = data.map(user => ({
                'id': user.kirboid,
                'name': user.firstname + " " + user.lastname,
                'email': user.email,
                'projects': user.projectid,
                'major': user.major
            }));
        })
        .catch(response => {
          console.log('Uh Oh Stinky');
        });
  }

}



export interface User 
{
  id:any;
  name:string;
  email:string;
  password:string;
  projects:string[];
  major?:string;
}
export let users: User[] =
[
    // {name:"donovan",email:"t@t.com",password:"test",projects:['Project 1']},
    // {name:"Chris Barrera",email:"chrislbarrera@gmail.com",password:"chris",projects:['Project 1', 'Project 2'], "major": "Computer Science"},
    // {name:"Collin De Kalb",email:"cjdekalb@gmail.com",password:"collin",projects:['Project 3', 'Project 4'], "major": "Computer Science"},
    // {name:"Xavier Sepulveda",email:"Xavier0922@gmail.com",password:"xavier",projects:['Project 5', 'Project 2'], "major": "Computer Science"},
    // {name:"Shaan Barkat",email:"barkatshaan@gmail.com",password:"shaan",projects:['Project 1', 'Project 4'], "major": "Computer Science"},
    // {name:"Faraz",email:"faraz.nov96@gmail.com",password:"faraz",projects:['Project 2', 'Project 5'], "major": "Computer Science"},
    // {name:"Kyle Klauss",email:"k.klauss99@gmail.com",password:"kyle",projects:['Project 1', 'Project 3'], "major": "Computer Science"},
]
