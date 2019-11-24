import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FormControl } from '@angular/forms';

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

  onSubmit() {
    const email = document.getElementById("exampleInputEmail1");
    const password = document.getElementById("exampleInputPassword1");
    fetch('http://localhost:3001/login', {
      "method":"post",
      "headers": {
        "Content-Type":"application/json"
      },
      "body":JSON.stringify({
        email,
        password
      })
    }).then().catch(function(res) {
      console.log(res);
    })
  }

}

