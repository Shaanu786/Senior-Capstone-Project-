import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email;
    password;
    goHome() 
    {
        console.log(`logging in user ${this.email} with password ${this.password}`);
        this.auth.userLogin(this.email,this.password)
        //console.log(`setting user object to: ${this.email}`);
        this.router.navigate(['/home']);
    }
  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() { }

}
