import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as  sha256 from 'async-sha256';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from 'src/app/global';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  currentUser: User = new User();
  public name = "היי ";
  registerForm: FormGroup;
  submitted = false;

  constructor(public userService: UserService, public router: Router,
    public titleService: Title, public _snackBar: MatSnackBar, public formBuilder: FormBuilder, public dialog: MatDialog) {
    this.titleService.setTitle("מחפשת משרה | כניסה");

  }
  ngOnInit() {
    debugger;
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(16)]

    });
    // this.currentUser=this.global.CurrentUser;
  }
  get f() { return this.registerForm.controls; }

  async login() {
    debugger
    var z;
    var password = this.registerForm.controls["password"].value;
    this.currentUser.UserMail = this.registerForm.controls["email"].value;
    this.currentUser.password = await sha256(password);
    localStorage.setItem("token", this.currentUser.password);
    debugger;
    this.userService.login(this.currentUser)
      .subscribe((res: any) => {
        if (res) {
          this.userService.user = res;
          this.userService.boss = null;
          localStorage.removeItem("isBoss");
          this.userService.setUser(res);
          localStorage.setItem("token", this.currentUser.password);
          // localStorage.setItem("UserPassword",this.currentUser.password);
          localStorage.setItem("UserMail", res.UserMail);
          localStorage.setItem("UserName", res.UserName);
          localStorage.setItem("UserId", res.UserId.toString());
          debugger;
          //  שינוי 
          // var token = JSON.parse(res.Value.TokenJson)
          // this.userService.changeToken(token.access_token);

          // var user = res.Value.User;
          //  שינוי 

          // localStorage.token = token.access_token;

          this.userService.boss = null;

          this._snackBar.open("ברוך בואך  " + this.userService.user.UserName, 'X', { duration: 3000 });
          this.router.navigate(['home/job-table']);
          // Swal.fire({
          //   title: 'success!',
          //   text: " היי" + "" + user.UserName,
          //   type: 'success',
          //   confirmButtonText: 'המשך'
          // })


        }

        else {
          this._snackBar.open('השם ו/או הסיסמה שגויים', 'X');
          Swal.fire({
            title: 'שגיאה!',
            text: ' המשתמש לא קיים במערכת !!!',
            type: 'error',
            confirmButtonText: 'הרשם עכשיו '
          })
          // this.router.navigate(['register/register-user']);

        }
      },
        err => {

        })
  }
  onSubmit() {
    debugger
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.valid) {
      return;
      debugger
    }

    else if (this.registerForm.invalid) {
      this.login();
    }
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }

}




// import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/shared/models/user';
// import { UserService } from 'src/app/shared/services';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2'
// import * as  sha256 from 'async-sha256';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Global } from 'src/app/global';

// @Component({
//   selector: 'app-login-user',
//   templateUrl: './login-user.component.html',
//   styleUrls: ['./login-user.component.css']
// })
// export class LoginUserComponent implements OnInit {

//   currentUser: User = new User();
//   private name = "היי ";
//   registerForm: FormGroup;
//   submitted = false;
//   createForm(){
//     this.registerForm = this.formBuilder.group({
//       password: ['', [Validators.required,Validators.minLength(4)]],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }
//   ngOnInit() {
//     this.createForm();
//   }
//  get f() {
//    return this.registerForm.controls; }
//  onSubmit() 

//   {

//     this.submitted = true;
//     // stop here if form is invalid
//     if (this.registerForm.invalid) 
//     {
//       this.resetForm();
//       return;
//     }
//     this.login();
//   }
//   resetForm()
//   {
//     this.registerForm.reset();
//   }
//   async login() {
//     var z;

//     //שינוייי
//     // let phone=this.registerForm.controls["password"].value;
//     // let email=this.registerForm.controls["email"].value;
//   var password=this.registerForm.controls["password"].value;
//     this.currentUser.UserMail=this.registerForm.controls["email"].value;
//     this.currentUser.password = await sha256(password);
//     localStorage.setItem("token",this.currentUser.password);
//     this.userService.login(this.currentUser)
//       .subscribe((res: any) => {
//         if (res) {
//           this.userService.user=res;
// this.userService.boss=null;
//           this.userService.setUser(res);
//           localStorage.setItem("token",this.currentUser.password);
//           // localStorage.setItem("UserPassword",this.currentUser.password);
//           localStorage.setItem("UserMail",res.UserMail);
//           localStorage.setItem("UserName",res.UserName);
//           localStorage.setItem("UserId",res.UserId.toString());
//           var token = JSON.parse(res.Value.TokenJson)
//           this.userService.changeToken(token.access_token);

//           var user = res.Value.User;
//           localStorage.token = token.access_token;

//           this.userService.boss = null;
//           this.name += res;
//           Swal.fire({
//             title: 'success!',
//             text: " היי" + "" + user.UserName,
//             type: 'success',
//             confirmButtonText: 'המשך'
//           })

// this.resetForm();
//         }

//         else {

//           Swal.fire({
//             title: 'שגיאה!',
//             text: ' המשתמש לא קיים במערכת !!!',
//             type: 'error',
//             confirmButtonText: 'הרשם עכשיו '
//           })
//           this.router.navigate(['register/register-user']);

//         }
//       },
//         err => {

//         })
//   }

// }




