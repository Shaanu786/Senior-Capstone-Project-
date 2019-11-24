import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService} from '../tasks-service/task-service.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
    tasks = this.taskService.getAllTasks();
    todo = this.taskService.getTodo();
    progress = this.taskService.getProgress();
    done = this.taskService.getFinished();
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        //console.log(event.currentIndex);
        //console.log(event.container.id);
        this.taskService.changeTaskStatus(JSON.parse(event.container.data[event.currentIndex]), event.container.id.slice(-1));
    }
  }
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }

}
