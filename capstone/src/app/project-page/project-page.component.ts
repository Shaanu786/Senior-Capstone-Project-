import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  title;
  projects = []
  team_members = ["This","Is","Where","Team","Members", "Go"]
  constructor(private route: ActivatedRoute) { }

    async ngOnInit() {
      const user = JSON.parse(sessionStorage.getItem('user'));
        await fetch(`http://localhost:3001/home/${user.id}`)
        .then(res => res.json())
        .then(({ data }) => this.projects = data);
        console.log("I am in the project page component", this.projects);
      this.route.paramMap.subscribe(params =>
      {
        this.title = params.get('id');
      });
  }

}
