import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    logout() 
    {
        console.log(`logging user ${localStorage.getItem('user')} out`);
        localStorage.removeItem('user');
    }

  constructor() { }

  ngOnInit() {
  }

}
