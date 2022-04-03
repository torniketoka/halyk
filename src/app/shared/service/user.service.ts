import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user.model";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  public inMemoryUsers = [];
  userFound = false;
  
  private users = [];
  private _isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  public get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn;
  }

  load() {
      this.http.get("assets/data/users.json").subscribe((data: any) => {
       var users = JSON.stringify(data);
       localStorage.setItem('users', users);
    }, err => {
      console.log(err);
    });
  }

  authenticate(name: string, password: string) {

    this.inMemoryUsers = <User[]>JSON.parse(localStorage.getItem('users'));   
    Object.keys(this.inMemoryUsers).forEach(key => {
      this.users.push(this.inMemoryUsers[key][0]);
      this.users.push(this.inMemoryUsers[key][1]);
      this.users.push(this.inMemoryUsers[key][2]);
    });

    this.users.forEach(user=> {
      if(user.name === name && user.password === password) {
        this.userFound= true;
      }
    })

    if(this.userFound) {
      this._isLoggedIn.next(true);
      this.userFound = false;
      return true;
    } else {
      return false;
    }
  }

  register(name: string, password: string, email: string) {

    this.inMemoryUsers = <User[]>JSON.parse(localStorage.getItem('users'));   
    Object.keys(this.inMemoryUsers).forEach(key => {
      this.users.push(this.inMemoryUsers[key][0]);
      this.users.push(this.inMemoryUsers[key][1]);
      this.users.push(this.inMemoryUsers[key][2]);
    });

    this.users.forEach(user=> {
      if(user.email === email) {
        this.userFound= true;
      }
    })

    if(this.userFound) {
      this.userFound = false;
      return true;
    } else {
      return false;
    }
  }

  storeUser(name: string, password: string, email: string) {

    let user: User = {
      name: name,
      password: password,
      email: email
    };
    this.users.push(user);
  }

  logOut() {
    this._isLoggedIn.next(false);
  }
} 