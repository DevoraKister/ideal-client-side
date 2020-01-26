import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models/user';
import * as  sha256 from 'async-sha256';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
export interface LoginObject {
  email:string;
  password:string;
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
//098866090

export class ResetPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: User;
  myModel: any;
  public loading;
  datemask = "/\d/g";
  createForm() {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  constructor(public router: Router, public userService: UserService, public formBuilder: FormBuilder, 
    public titleService:Title, public _snackBar: MatSnackBar) 
  {
    this.createForm();
    this.titleService.setTitle("איפוס סיסמא");

  }
  @ViewChild(NgForm) myForm: NgForm;
  ngOnInit() {
  }

  get f() { return this.registerForm.controls; }

  


  async onSubmit() 
  {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) 
    {
      return;
    }
    if (this.registerForm.controls["password"].value != this.registerForm.controls["password1"].value) 
    {
     
        // this._snackBar.open('הסיסמה לא זהה','X');
        Swal.fire({
          title: '!שגיאה',
          text: ' !!!הסיסמה לא זהה',
          type: 'error',
          confirmButtonText: 'הקש סיסמה שוב '
        })
        return;

      }
     
    debugger;
    let email = this.registerForm.controls["email"].value;
    let password  =await sha256(this.registerForm.controls["password"].value);
  
    this.userService.resetPassword(email, password).subscribe(res => {
      this.user=res;
      if (res) {
        debugger;
       this. user = res;
        this._snackBar.open('הסיסמה עודכנה בהצלחה', 'X', { duration: 3000 });
        this.router.navigate(['']);
        this.userService.user = res;
        this.userService.boss = null;
        localStorage.removeItem("isBoss");
        this.userService.setUser(res);
        localStorage.setItem("token", this.user.password);
        localStorage.setItem("UserMail", res.UserMail);
        localStorage.setItem("UserName", res.UserName);
        localStorage.setItem("UserId", res.UserId.toString());
        this.userService.boss = null;
        
        this._snackBar.open("ברוך בואך  "+this.userService.user.UserName,'X',{duration: 3000});
        this.router.navigate(['home/job-table']);
      }
    })

  }

}
