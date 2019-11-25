import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService} from '../tasks-service/task-service.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
    @Input() project: string;
    todo;
    progress;
    done;
    projectUrl;
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
  constructor(private dialog:MatDialog,
              private taskService:TaskService,
              private route: ActivatedRoute,
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
              this.refreshLists(this.projectUrl);
          }
      });
  }

}
