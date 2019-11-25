import { Injectable } from '@angular/core';
<<<<<<< Updated upstream

const statuses = {
    0: 'todo',
    1: 'progress',
    2: 'finished'
};
=======
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
    appTasks: Task[] = [];
    getAllTasks() 
    {
        return this.appTasks;
    }
    getTaskStatus(status:string): Task[]
    {
        return this.appTasks.filter(task => task.status === status);
    }
    getNotFinished(): Task[] 
    {
        return this.getTaskStatus('todo').concat(this.getTaskStatus('progress'));
    }
    getTodo(): Task[] 
    {
        return this.getTaskStatus('todo');
    }
    getFinished(): Task[] 
    {
        return this.getTaskStatus('finished');
    }
    getProgress(): Task[] 
    {
        return this.getTaskStatus('progress');
    }
    getTaskStatusProject(status:string, project:string): Task[]
    {
        return this.appTasks.filter(task => 
                                    {
                                        //@ts-ignore
<<<<<<< Updated upstream
                                        //console.log(`testing task. status: ${task.status} project: ${task.project}`);
                                        //console.log(`project to test against: ${project}`)
=======
                                        console.log(`testing task. status: ${task.status} project: ${task.project}`);
                                        console.log(`project to test against: ${project}`)
>>>>>>> Stashed changes
                                        if (task.status != status) return false;
                                        if (task.project != project) return false;
                                        return true;
                                    });
    }
    getTodoProject(project:string): Task[] 
    {
        console.log("in getTodoProject", project);
        return this.getTaskStatusProject('todo', project);
    }
    getFinishedProject(project:string): Task[] 
    {
        return this.getTaskStatusProject('finished', project);
    }
    getProgressProject(project:string): Task[] 
    {
        return this.getTaskStatusProject('progress', project);
    }
    changeTaskStatus(taskItem:any, newStatus:string) 
    {
        this.appTasks.forEach(task => 
       {
           //@ts-ignore
           if (task == taskItem)
            {
<<<<<<< Updated upstream
                //@ts-ignore
                console.log(`updating task ${taskItem.title} to status ${newStatus}`);
                task.status = newStatus;
                const taskid = task.taskid;
                console.log("taskid", task);
                console.log(task.status);
                
                fetch('http://localhost:3001/project', {
                "method":"post",
                "headers": {
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify({
                    taskid,
                    newStatus
                })
                })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    this.fetchTasks();
                })
                .catch(response => {
                    console.log("oh no");
                })
              
=======
               //@ts-ignore
               console.log(`updating task ${taskItem.title} to status ${newStatus}`);
              task.status = newStatus;
>>>>>>> Stashed changes
            } 
        });
    }
    getUserTasks(userId:string): Task[] 
    {
        return this.appTasks.filter(task => task.user == userId);
    }
    createTask(newTask:any)
    {
       console.log(`received newTask in task service: ${ newTask }`); 
       var newGuy = {title:newTask.title,
           description:newTask.description,
           project:newTask.project,
           status:'todo',
           due:newTask.duedate,
           user:newTask.user,
           taskid:newTask.title + newTask.project}
<<<<<<< Updated upstream
           fetch('http://localhost:3001/addtask', {
            "method":"post",
            "headers": {
                "Content-Type":"application/json"
            },
            })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                this.fetchTasks();
            })
            .catch(response => {
                console.log("oh no");
            });
        this.appTasks.push(newGuy);
        
=======
        this.appTasks.push(newGuy);
>>>>>>> Stashed changes
    }

    constructor() { }

    async fetchTasks() {
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        return fetch(`http://localhost:3001/user/${id}/tasks`)
            .then(res => res.json())
            .then(({ data }) => {
                console.log("I am in the fetch tasks function", data);
                this.appTasks = data.map(item => ({
                    'title': item.taskname,
                    'project': item.projectname,
                    'status': statuses[item.completeflag],
                    'due': item.duedate,
                    'tasksid': item.tasksid
                }));
            });
    }
}
export interface Task {
  title:string;
  description:string;
  project:string;
  status:string;
  due:string;
  user:string;
  taskid:string;
}
<<<<<<< Updated upstream
=======
export interface Task {
  title:string;
  description:string;
  project:string;
  status:string;
  due:string;
  user:string;
  taskid:string;
}
>>>>>>> Stashed changes

export const tasks: Task[]= [
  {title:"Take Quiz 03",description:"Review modules 02 &03",project:"Project 2",status:"todo",due:" November 12th, 2019",user:"",taskid:"1"},
  {title: "Update documentation", description: "Update current documentation with recent project changes", project: "Project 2", status: "progress", due: "11/21/19",user:"",taskid:"2"},
  {title:"read chapters 1-3 ",description:"Algorithms",project:"Project 2",status:"finished",due:" November 12th, 2019",user:"",taskid:"3"},
  {title:"Implement Command Interface", description:"Implement the command design pattern to Project 4", project:"Project 2", status:"progress", due:"11/25/19",user:"",taskid:"4"},
  {title:"Lab Activity 08",description:"Create an ArcScene Map",project:"Project 4",status:"finished",due:" November 18th, 2019",user:"",taskid:"5"},
  {title: "Complete Assignment 2", description: "Finish the upcoming assignment", project: "Project 2", status: "finished", due: "10/30/19",user:"",taskid:"6"},
  {title:'Observer Pattern', description:'Apply the observer design pattern to project 5', project:'Project 5',status:'progress',due:'11/12/19',user:"",taskid:"7"},
  {title:"Final Project Proposal",description:"Write your final project proposal",project:"Project 1",status:"progress",due:" November 14th, 2019",user:"",taskid:"8"},
  {title:"Eat Dinner",description:"Eat before you die",project:"Project 1",status:"todo",due:" November 14th, 2019",user:"",taskid:"9"},
  {title: "Work on stylized css sheet", description: "Create the style.css sheet to connect to frontend", project: "Project 3", status: "progress", due: "10/14/19",user:"",taskid:"10"}
]
