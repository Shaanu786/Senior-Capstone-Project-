import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../tasks-service/task-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
    user;
    submitTask()
    {
        console.log('submitting task in add task component');
        var newTask = 
        {
            "title": this.title,
            "project": this.data.project,
            "description": this.description,
            "duedate": this.duedate,
            "user": this.user,
        };
        console.log(`created new task for project: ${newTask.project}`);
        this.tasks.createTask(newTask);
    }
	close()
    {
        console.log("closing dialog");
       this.dialogRef.close(); 
    }

    constructor(private tasks:TaskService,
                private dialogRef:MatDialogRef<AddTaskComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
