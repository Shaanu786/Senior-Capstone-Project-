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
        if (!this.email || !this.password) {
          console.warn('all fields are required!');
        }
        console.log(`logging in user ${this.email} with password ${this.password}`);
        this.auth.userLogin(this.email,this.password)
        //console.log(`setting user object to: ${this.email}`);
        this.router.navigate(['/home']);
    }
  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() { }

  onSubmit() {
    const email: HTMLInputElement= document.getElementById('emailBox').value;
    const password: HTMLInputElement = document.getElementById("passwordBox").value;
    console.log(email, password);
    if (!email || !password) {
      console.warn('all fields are required!');
      return; // maybe look into messaging user that they need to fill out required fields?
    }
  }

}

