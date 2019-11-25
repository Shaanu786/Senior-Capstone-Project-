import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks-service/task-service.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    title;
    projectId;
    description;
    duedate;
    submitTask()
    {
        console.log('submitting task in add task component');
        var newTask = 
        {
            "title": this.title,
            "projectId": this.projectId,
            "description": this.description,
            "duedate": this.duedate,
        };
        this.tasks.createTask(newTask);
    }
	close()
    {
        console.log("closing dialog");
       this.dialogRef.close(); 
    }

    constructor(private tasks:TaskService,
                private dialogRef:MatDialogRef<AddTaskComponent>) { }

  ngOnInit() {
  }

}
