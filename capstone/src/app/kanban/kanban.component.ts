import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService} from '../tasks-service/task-service.service';
import {  Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskInfoDialogComponent } from '../task-info-dialog/task-info-dialog.component';
import { UsersService } from '../users/users.service';
import { Task } from '../tasks-service/task-service.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
    @Input() project: string;
    todo:Task[];
    progress:Task[];
    done:Task[];
    projectUrl:string;
    members: any[];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      //this.openInfoDialog(event.container.data[event.currentIndex]);
      this.openInfoDialog(event.container.data[event.currentIndex]);
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
  constructor(private dialog:MatDialog,
              private taskService:TaskService,
              private userService:UsersService,
              private router: Router,
              private route: ActivatedRoute) { }
  openInfoDialog(taskitem)
  {
		//console.log("in info dialog");
		const dialogConfig = new MatDialogConfig();

        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { 'task':taskitem, 'members': this.members };

        this.dialog.open(TaskInfoDialogComponent, dialogConfig);
  }


  openAddDialog()
  {
		console.log("in dialog");
		const dialogConfig = new MatDialogConfig();

        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {'project': this.project, 'members':this.members};

        this.dialog.open(AddTaskComponent, dialogConfig);
  }
  refreshLists()
  {
      console.log(`refreshing tasks for project ${this.projectUrl}`);
      this.todo = this.taskService.getTodoProject(this.projectUrl);
      this.progress = this.taskService.getProgressProject(this.projectUrl);
      this.done  = this.taskService.getFinishedProject(this.projectUrl);
  }

  async ngOnInit() {
    await this.userService.fetchUsers();
    await this.taskService.fetchTasks();
    console.log(this.taskService.appTasks);
    this.route.paramMap.subscribe(() =>
      {
          this.todo = this.taskService.getTodoProject(this.project);
          this.progress = this.taskService.getProgressProject(this.project);
          this.done  = this.taskService.getFinishedProject(this.project);
          this.members = this.userService.getUsersProject(this.project);
    })
  }
}
 