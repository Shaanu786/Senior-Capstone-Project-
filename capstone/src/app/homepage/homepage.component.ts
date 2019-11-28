import { Component, OnInit } from '@angular/core';
//import {tasks} from '../kanban/tasks';
import {animate, state, style, transition, trigger} from '@angular/animations';
// let tableTasks = [tasks.progress, tasks.todo];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomepageComponent implements OnInit {
  title = "Home"
  columns = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
  projects = []
  // displayedColumns: string[] = ['title', 'project', 'status'];
  // dataSource = tableTasks;
  onRowClicked(row)
  {
    console.log('Row clicked: ', row)
  }
  constructor() { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    fetch(`http://localhost:3001/home/${user.id}`)
      .then(res => res.json())
      .then(({ data }) => this.projects = data);
  }

}
