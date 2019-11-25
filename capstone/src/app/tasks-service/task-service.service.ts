import { Injectable } from '@angular/core';
import { Task, tasks } from '../tasksdb/tasks';

const statuses = {
    0: 'todo',
    1: 'progress',
    2: 'finished'
};

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
                                        console.log(`testing task. status: ${task.status} project: ${task.project}`);
                                        console.log(`project to test against: ${project}`)
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
           if (task == taskItem)
            {
                console.log(`updating task ${taskItem.title} to status ${newStatus}`);
              task.status = newStatus;
            } 
        });
    }
    getUserTasks(userId:string): Task[] 
    {
        return this.appTasks.filter(task => task.user == userId);
    }

    constructor() { }

    async fetchTasks() {
        const { id } = JSON.parse(sessionStorage.getItem('user'));
        return fetch(`http://localhost:3001/user/${id}/tasks`)
            .then(res => res.json())
            .then(({ data }) => {
                this.appTasks = data.map(item => ({
                    'title': item.taskname,
                    'project': item.projectname,
                    'status': statuses[item.completeflag],
                    'due': item.duedate
                }));
            });
    }
}
