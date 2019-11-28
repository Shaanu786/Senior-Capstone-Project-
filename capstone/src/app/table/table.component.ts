import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TaskService} from '../tasks-service/task-service.service';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent {
  dataSource = [];
  columnsToDisplay = ['title', 'project', 'status', 'due'];
  expandedElement: PeriodicElement | null;
  constructor(private taskService:TaskService) { }
  async ngOnInit() {
    await this.taskService.fetchTasks();
    this.dataSource = this.taskService.getNotFinished();
  }
}


export interface PeriodicElement {
  project: string;
  title: number;
  status: number;
  due: string;
  description: string;
}
