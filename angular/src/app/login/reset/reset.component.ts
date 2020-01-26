import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models/user';
import * as  sha256 from 'async-sha256';
import { Router } from '@angular/router';


import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  registerForm: FormGroup;
  mail: string;
  submitted = false;
  s: any;
  myModel: any;
  datemask = "/\d/g";
public loading;

  createForm() {
    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
    });

  }

  constructor(public formBuilder: FormBuilder, public userService: UserService,public  router: Router,
    public titleService:Title, public _snackBar: MatSnackBar) {
    this.createForm();
    this.titleService.setTitle("איפוס סיסמא");

  }
  @ViewChild(NgForm) myForm: NgForm;
  ngOnInit() {

  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return; }
    let email = this.registerForm.controls["email"].value;
    this.userService.resetMail(email)
      .subscribe(res => {
        if (res) {
          debugger;
           this.myForm.resetForm();
          this._snackBar.open('תודה על פניתך החשובה, נענה בהקדם', 'X', { duration: 3000 });
          this.router.navigate(['']);
        }
      })

  }

}













