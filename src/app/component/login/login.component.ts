import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UsersService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  ionicForm: FormGroup;
  userName:string;
  password:string;

  constructor(
    public formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastService: ToastService
    ) { 
    this.ionicForm = formBuilder.group({
      name: ["", Validators.required],
      password: ["", Validators.required]
    }) 
  }

  ngOnInit() {
  }

  submitForm() {
    this.userName = this.ionicForm.get("name").value;
    this.password = this.ionicForm.get("password").value;
    
    
    if(this.usersService.authenticate(this.userName, this.password)) {
       localStorage.setItem("currentUser", this.userName);
       this.router.navigate(['/home']);
    } else {
      if((this.userName === '' && this.password === '') || (this.userName === null && this.password === null)){
        this.toastService.presentToast("To be able to log in, name and password must be entered")
      } else {
        this.toastService.presentToast("User does not exist, please register or enter correct data")
      }
    }

    this.clearInputFields();
  }

  clearInputFields() {
    this.ionicForm.reset();
  }
}
