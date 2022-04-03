import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import {takeWhile, tap} from "rxjs/operators";
import { Card } from 'src/app/shared/model/card';
import { UsersService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public inMemoryCards = [];
  countDownTime;
  currentUSer = "";

  private cards = [];
  
  constructor(
    private router: Router,
    private userService: UsersService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.currentUSer = localStorage.getItem("currentUser");
    this.loadCards();
    this.handleCountDown(60);
  }

  handleCountDown(second: number) {
      this.countDownTime = second;
      timer(1000, 1000)
        .pipe(takeWhile(() => this.countDownTime > 0), tap(() => this.countDownTime--))
        .subscribe(val => {
          if(val === 59) {
            this.logout();
          }
        });
  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['folder/Login']);
  }

  loadCards() {
    this.http.get("assets/data/cards.json").subscribe((data: any) => {
    var cards = JSON.stringify(data);
    localStorage.setItem('cards', cards);
    }, err => {
     console.log(err);
    });

    this.inMemoryCards = <Card[]>JSON.parse(localStorage.getItem('cards'));   
    Object.keys(this.inMemoryCards).forEach(key => {
    this.cards.push(this.inMemoryCards[key][0]);
    this.cards.push(this.inMemoryCards[key][1]);
    this.cards.push(this.inMemoryCards[key][2]);
  });
  }

}
