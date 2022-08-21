import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:LoginComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class LoginModule { }
