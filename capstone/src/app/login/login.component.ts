import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
// import { FormControl } from '@angular/forms';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { AuthService } from '../auth/auth.service';
=======
=======
import { AuthService } from '../auth/auth.service';
>>>>>>> b9d4b28c5fa2c54e5d6d060a49c59725b29cbc36
>>>>>>> Stashed changes
=======
=======
import { AuthService } from '../auth/auth.service';
>>>>>>> b9d4b28c5fa2c54e5d6d060a49c59725b29cbc36
>>>>>>> Stashed changes

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

  onSubmit() {
    const email:InnerHTML = document.getElementById('emailBox').value;
    const password:InnerHTML = document.getElementById("passwordBox").value;
    console.log(email);
    console.log(password);
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

