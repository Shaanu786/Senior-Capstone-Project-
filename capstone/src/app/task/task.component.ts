import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() title: string;
  @Input() project: string;
  @Input() course: string;
  constructor() { }

  ngOnInit() {
  }
  clickTask() {
    alert("Put logic to bring up task");
  }
}
