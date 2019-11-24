import { Injectable } from '@angular/core';
import { Task, tasks } from '../tasksdb/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
    appTasks: Task[] = tasks;
    getAllTasks() 
    {
        //console.log(tasks);
        return this.appTasks;
    }
    getTaskStatus(status:string): Task[]
    {
        return this.appTasks.filter(task => task.status == status);
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
    changeTaskStatus(taskItem:string, newStatus:string) 
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
}
