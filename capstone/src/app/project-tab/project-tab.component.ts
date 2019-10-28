import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-tab',
  templateUrl: './project-tab.component.html',
  styleUrls: ['./project-tab.component.css']
})
export class ProjectTabComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
