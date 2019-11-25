import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService} from '../tasks-service/task-service.service';
<<<<<<< Updated upstream
import { ActivatedRoute } from '@angular/router';
import { async } from 'q';
// import {  Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
// import { UsersService } from '../users/users.service';
// import { Task } from '../tasks-service/task-service.service';
=======
import {  Router, NavigationStart } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UsersService } from '../users/users.service';
import { Task } from '../tasks-service/task-service.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
    @Input() project: string;
<<<<<<< Updated upstream
    todo
    progress
    done
=======
    todo:Task[];
    progress:Task[];
    done:Task[];
    projectUrl:string;
    members: any[];
>>>>>>> Stashed changes
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        //console.log(event.container.data[event.currentIndex]);
        this.taskService.changeTaskStatus(event.container.data[event.currentIndex],
                                            event.container.id);
    }
  }
<<<<<<< Updated upstream
  constructor(
              private taskService:TaskService,
              private route:ActivatedRoute,
              private dialog:MatDialog,) {}

  refreshLists()
  {
      console.log(`refreshing tasks for project ${this.project}`);
      this.todo = this.taskService.getTodoProject(this.project);
      this.progress = this.taskService.getProgressProject(this.project);
      this.done  = this.taskService.getFinishedProject(this.project);
  }

  openDialog()
  {
		console.log("in dialog");
		const dialogConfig = new MatDialogConfig();

        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {'project': this.project,
                             'projectid': this.taskService.appTasks[0].projectid}


        this.dialog.open(AddTaskComponent, dialogConfig);
  }

ngOnInit() {
    //await this.taskService.fetchTasks();
    console.log(this.taskService.appTasks);
    this.route.paramMap.subscribe(async() =>
      {
          await this.taskService.fetchTasks();
          //this.project = this.taskService.appTasks[0].project;
          console.log("In the async func ", this.taskService.appTasks[0].project);
          console.log("Printing this.project", this.project);
          this.todo = this.taskService.getTodoProject(this.project);
          this.progress = this.taskService.getProgressProject(this.project);
          this.done  = this.taskService.getFinishedProject(this.project);
=======
  constructor(private dialog:MatDialog,
              private taskService:TaskService,
              private userService:UsersService,
              private router: Router) { }

  openDialog()
  {
		console.log("in dialog");
		const dialogConfig = new MatDialogConfig();

        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {'project': this.project};

        this.dialog.open(AddTaskComponent, dialogConfig);
  }
  refreshLists()
  {
      console.log(`refreshing tasks for project ${this.projectUrl}`);
      this.todo = this.taskService.getTodoProject(this.projectUrl);
      this.progress = this.taskService.getProgressProject(this.projectUrl);
      this.done  = this.taskService.getFinishedProject(this.projectUrl);
  }

  ngOnInit() {
    this.router.events.subscribe(event =>
      {
          //first clicked project will not show them, but shows all of them after
          if (event instanceof NavigationStart && event.url.includes('Project')) 
          {
              this.projectUrl = `Project ${event.url.slice(-1)}`;
              this.refreshLists();
              this.members = this.userService.getUsersProject(this.projectUrl);
              if (this.members.length > 0)
                  {
                      console.log(`members found for project ${this.projectUrl}: ${ this.members[0].email }`)
                  }
          }
>>>>>>> Stashed changes
      });
  }

}
