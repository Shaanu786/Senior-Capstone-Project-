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
    const email: HTMLInputElement = document.getElementById('exampleInputEmail1').value;
    const password: HTMLInputElement = document.getElementById("exampleInputPassword1").value;
    if (!email || !password) {
      console.warn('all fields are required!');
      return; // maybe look into messaging user that they need to fill out required fields?
    }
    fetch('http://localhost:3001/login', {
      "method":"post",
      "headers": {
        "Content-Type":"application/json"
      },
      "body":JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        this.router.navigate(['/home']);
      })
      .catch(response => {
        alert('Incorrect login credentials. Please try again.');
      })
  }

}

