import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  title = "Project"
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  team_members = ["This","Is","Where","Team","Members", "Go"]
  columns = ["Todo","In Progress","Finished"]
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.title = history.state.data
    this.route.paramMap.subscribe(params =>
      {
        this.title = params.get('id')
      })
  }

}
