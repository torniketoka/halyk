import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UsersService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userName:string;
  password:string;
  email:string;

  constructor(
    public formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastService: ToastService
    ) { 
    this.registerForm = formBuilder.group({
      registerName: ["", Validators.required],
      registerPassword: ["", Validators.required],
      registerEmail: ["", Validators.required]
    }) 
  }

  ngOnInit() {
  }

  submitForm() {
    this.userName = this.registerForm.get("registerName").value;
    this.password = this.registerForm.get("registerPassword").value;
    this.email = this.registerForm.get("registerEmail").value;

    if(this.usersService.register(this.userName,this.password,this.email)) {
      this.toastService.presentToast("User with same email already registered, please use other email")
    } else {
      this.usersService.storeUser(this.userName,this.password,this.email);
      this.router.navigate(['folder/Login']);
    }

    this.clearInputFields();
  }

  clearInputFields() {
    this.registerForm.reset();
  }
}
