import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css']
})
export class TaskColumnComponent implements OnInit {
  @Input() header: string;
  constructor() { }

  ngOnInit() {
  }

}
