import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  title = "Profile"
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  badges = ["Team Player", "Frontend Specialist", "Crunch Time Hero"]
  constructor() { }

  ngOnInit() {
  }
}
