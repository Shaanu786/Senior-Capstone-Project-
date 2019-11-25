import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TaskService } from '../tasks-service/task-service.service';

@Component({
  selector: 'app-task-info-dialog',
  templateUrl: './task-info-dialog.component.html',
  styleUrls: ['./task-info-dialog.component.css']
})
export class TaskInfoDialogComponent implements OnInit {
    task;
    members;
    user;
	close()
    {
       console.log('in indo dialog');
       this.dialogRef.close(); 
       console.log(this.data);
    }
    assign() {
        console.log("reassigning task");
        this.taskService.changeTaskUser(this.data.task, this.user);
    }

    constructor(private taskService:TaskService,
                private dialogRef:MatDialogRef<TaskInfoDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) 
               {
                   this.task = data.task;
                   this.members = data.members;
                   if (this.task.user === '') data.task.user = "Unassigned";
               }

  ngOnInit() {
  }

}
