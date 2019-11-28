import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../tasks-service/task-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    title;
    projectname;
    description;
    duedate;
    user;
    members = this.data.members;
    submitTask()
    {
        console.log('submitting task in add task component');
        console.log("henlo?", this.data.members[0].id);
        var newTask = 
        {
            "title": this.title,
            "projectname": this.projectname,
            "projectid": this.data.projectid,
            "description": this.description,
            "duedate": this.duedate,
            "user": this.user,
            "kirboid": this.data.members[0].id
        }
       // console.log(`created new project for project: ${newTask.project}`);
        fetch('http://localhost:3001/addtask', {
               "method":"post",
               "headers": {
                   "Content-Type":"application/json"
               },
               "body":JSON.stringify({
                   'title':newTask.title,
                   'projectname':newTask.projectname,
                   'projectid':newTask.projectid,
                   'description':newTask.description,
                   'duedate':newTask.duedate,
                   'user':newTask.user,
                   'kid':newTask.kirboid
               })
               })
               .then(response => response.json())
               .then((response) => {
                   console.log(response);
                   this.tasks.createTask(response);
               })
               .catch(response => {
                   console.log("oh no");
               })
        this.tasks.createTask(newTask);
    }
	close()
    {
       console.log("closing dialog");
       this.dialogRef.close(); 
       console.log(this.data);
    }

    constructor(private tasks:TaskService,
                private dialogRef:MatDialogRef<AddTaskComponent>,
                private route: ActivatedRoute,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

    async ngOnInit() {
        await this.tasks.fetchTasks();
        this.route.paramMap.subscribe(async () =>
        {
            this.projectname = this.tasks.getProjectname(this.data.projectid);
            console.log("Is this working?");
        });
        console.log("Projectname", this.projectname);
  }

}
