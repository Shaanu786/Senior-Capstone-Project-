import { Injectable } from '@angular/core';
import { Task, tasks } from '../tasksdb/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
    statuses = ['todo','progress','finished']
    getAllTasks() 
    {
        //console.log(tasks);
        return tasks;
    }
    getTaskStatus(status:string): Task[]
    {
        return tasks.filter(task => task.status == status);
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
    changeTaskStatus(taskItem:Task, newStatus:string) 
    {
        console.log(taskItem);
        tasks.forEach(task => 
       {
           if (task == taskItem)
            {
              task.taskid = this.statuses[newStatus]; 
            } 
        });
    }
    getUserTasks(userId:string): Task[] 
    {
        return tasks.filter(task => task.user == userId);
    }

  constructor() { }
}
