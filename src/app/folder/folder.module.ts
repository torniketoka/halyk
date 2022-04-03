import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import {IntegerInputDirective} from "../directive/integer-input.directive";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    FolderPage,
    LoginComponent,
    RegisterComponent,
    IntegerInputDirective
  ]
})
export class FolderPageModule {}
