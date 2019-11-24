import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  goHome() {
    this.router.navigate(['/home']);
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
