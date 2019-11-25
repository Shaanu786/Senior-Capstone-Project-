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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    project;
    projectid;
=======
    projectId;
>>>>>>> Stashed changes
=======
    projectId;
>>>>>>> Stashed changes
    description;
    duedate;
    user;
    submitTask()
    {
        console.log('submitting task in add task component');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        console.log('Project id ', this.data.projectid);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        var newTask = 
        {
            "title": this.title,
            "project": this.data.project,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            "projectid":this.data.projectid,
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            "description": this.description,
            "duedate": this.duedate,
            "user": this.user,
        };
        console.log(`created new project for project: ${newTask.project}`);
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
ngOnInit() {

}
=======
=======
>>>>>>> Stashed changes

  ngOnInit() {
  }

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
