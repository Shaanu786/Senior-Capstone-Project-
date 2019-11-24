import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  title;
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  team_members = ["This","Is","Where","Team","Members", "Go"]
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>
      {
        this.title = params.get('id')
      });
  }

}
