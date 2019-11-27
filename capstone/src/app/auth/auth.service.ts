import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userLogin(email:string,password:string):boolean
    {
        console.log('in userlogin');
        return this.users.authLogin(email, password);
    }
    isAuthenticated(): boolean
    {
        console.log('in authservice');
        if (sessionStorage.getItem('user') == null) return false;
        return true;
    }
  constructor(private users:UsersService) { }
}
