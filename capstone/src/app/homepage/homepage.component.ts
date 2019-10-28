import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title = "Home"
  columns = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  constructor() { }

  ngOnInit() {
  }

}
