import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  title = "Profile"
  user;
  projects = ["Project 1","Project 2","Project 3","Project 4","Project 5"]
  badges = ["Team Player", "Frontend Specialist", "Crunch Time Hero"]
  constructor(private userService:UsersService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>
      {
        this.user = this.userService.getUser(params.get('id'));
        if (typeof this.user.major == 'undefined') this.user.major = 'Major Not Listed';
      });
  }

}
