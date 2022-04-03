import { Component, OnInit } from '@angular/core';
import { LanguageService } from './shared/service/language.service';
import { UsersService } from './shared/service/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  
  public isLoggedIn: Observable<boolean>;

  public appPages = [
    { title: 'Login', url: '/folder/Login', icon: 'log-in' },
    { title: 'Register', url: '/folder/Register', icon: 'create' },
  ];

  constructor(
    private languageService: LanguageService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.initializeApp();
  }
 
  ngOnInit(): void {
    this.isLoggedIn = this.usersService.isLoggedIn.pipe(
      tap(value => console.log({value}))
    );
    if(this.isLoggedIn) {
      this.router.navigate(['folder/Login']);
    }
  }

  initializeApp() {
    this.languageService.setInitialAppLanguage();
    this.usersService.load();
  }

  segmentChanged(event) {
   const leng = event.detail.value;
   this.languageService.setLanguage(leng);
  }
}
