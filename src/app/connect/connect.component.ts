import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services';
// import Swal from 'sweetalert2'

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
export interface Registers extends FormBuilder{
  email:string;
  password:string;
}
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})

export class ConnectComponent implements OnInit {
public loading;
 public registerForm: FormGroup;
  p:Registers;
  submitted = false;
  myModel: any;
  datemask = "/\d/g";
 createForm() {
  
  this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required,Validators.minLength(7),Validators.maxLength(10)]],
    // phone: ['', [Validators.required,Validators.minLength(7),Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    details:['', Validators.required],
    subject:['', Validators.required]
  
});
}

  constructor(public  router:Router,public userService:UserService, public titleService:Title,public formBuilder: FormBuilder,private _snackBar: MatSnackBar) {
    this.createForm();
    this.titleService.setTitle("צור קשר");
   }
@ViewChild(NgForm) myForm: NgForm;
  ngOnInit() {
    
  }
  get f() { return this.registerForm.controls; }

  onSubmit()
   {
      this.submitted = true;
      // stop here if form is invalid
     if (this.registerForm.invalid) {
       return;
     }
      let name=this.registerForm.controls["name"].value;
      let phone=this.registerForm.controls["phone"].value;
      let email=this.registerForm.controls["email"].value;
      let details=this.registerForm.controls["details"].value;
      let subject=this.registerForm.controls["subject"].value;
      this.userService.connect(name,details,email,phone,subject).subscribe(res=>{
        if(res){ debugger;
          //  this.myForm.resetForm();
          this._snackBar.open('תודה על פניתך החשובה, נענה בהקדם', 'X', { duration: 3000 });
          this.router.navigate(['']);
          // Swal.fire({
          //   title: 'תודה שפנית אלינו!',
          //   text:" ,  פניתך התקבלה לטיפול בהקדם  ",
          //   type: 'success',
          //   confirmButtonText: 'המשך'
          // })
        }
      })
  }

   

}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../shared/services';
// import Swal from 'sweetalert2'

// import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
// import { MatSnackBar } from '@angular/material';
// import { Title } from '@angular/platform-browser';
// @Component({
//   selector: 'app-connect',
//   templateUrl: './connect.component.html',
//   styleUrls: ['./connect.component.css']
// })

// export class ConnectComponent implements OnInit {

//   registerForm: FormGroup;
//   submitted = false;
//   myModel: any;
//   datemask = "/\d/g";
//  createForm() {
//   this.registerForm = this.formBuilder.group({
//     name: ['', Validators.required],
//     phone: ['', [Validators.required,Validators.minLength(7),Validators.maxLength(10)]],
//     email: ['', [Validators.required, Validators.email]],
//     details:['', Validators.required],
//     subject:['', Validators.required]
  
// });
// }

//   constructor(private router:Router,private userService:UserService, public titleService:Title,private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {
//     this.createForm();
//     this.titleService.setTitle("צור קשר");
//    }
// @ViewChild(NgForm) myForm: NgForm;
//   ngOnInit() {
    
//   }
//   get f() { return this.registerForm.controls; }

//   onSubmit()
//    {
//       this.submitted = true;
//      if (this.registerForm.invalid) {
//        return;
//      }
//       let name=this.registerForm.controls["name"].value;
//       let phone=this.registerForm.controls["phone"].value;
//       let email=this.registerForm.controls["email"].value;
//       let details=this.registerForm.controls["details"].value;
//       let subject=this.registerForm.controls["subject"].value;
//       this.userService.connect(name,details,email,phone,subject).subscribe(res=>{
//         if(res){ debugger;
//           this._snackBar.open('תודה על פניתך החשובה, נענה בהקדם', 'X', { duration: 3000 });
//           this.router.navigate(['']);
     
//         }
//       })
//   }

// }
