import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services';
import { User } from '../shared/models/user';
import { SubjectJob } from '../shared/models/subjectJob';
import { JobService } from '../shared/services/job.service';
import { JobParameters } from '../shared/models/JobParameters';
import Swal from 'sweetalert2'
import { TimeSmartAgent } from '../shared/models/time';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LoginUserComponent } from '../login/login-user/login-user.component';
import { Title } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm  | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
@Component({
  selector: 'app-smart-agent',
  templateUrl: './smart-agent.component.html',
  styleUrls: ['./smart-agent.component.css']
})
export class SmartAgentComponent implements OnInit {
  currentUser: User = new User();
  details: boolean;


  time: TimeSmartAgent[] = [
    { id: 4, name: 'מיידי ' },
    { id: 1, name: 'יומי' },
    { id: 2, name: 'שבועי' },
    { id: 3, name: 'חודשי ' },
    { id: 0, name: 'כלל לא ' },

  ];
  // private subjectJob: SubjectJob[];
  public jobParameters: JobParameters = new JobParameters();

  constructor(public router: Router,public titleService:Title, public userService: UserService, public jobService: JobService, public dialog: MatDialog) {
    this.userService.userObs.subscribe(data => {
      this.getUser(data);
      this.titleService.setTitle("סוכן חכם");
    })
  }

  ngOnInit() {
    this.details = true;
    this.getUser(this.userService.user);
    this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;

    });
    if (!localStorage.getItem("token")) {
      const dialogRef = this.dialog.open(LoginUserComponent, {
        // width: '250px',
        height: '65vh',
        width: '40vw'
        // data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    }

  }

  getUser(data) {
    this.currentUser = data;
   
  }


  updateDetails(sub, city, part, time) {
    if (time.value == 0) {
      this.currentUser.UserIsSmartAgent = false;
      this.currentUser.UserSmartAgentTime = null;

    }
    else {
      this.currentUser.UserIsSmartAgent = true;
      this.currentUser.UserSmartAgentTime = time.value;

    }

    this.currentUser.UserPartId = part.value;
    this.currentUser.UserSubId = sub.value;
    this.currentUser.UserCityId = city.value;
    this.userService.updateUser(this.currentUser).subscribe(res => {
      this.userService.user = res;


      Swal.fire({
        title: 'הפרטים עודכנו בהצלחה!',
        // text: this.name,
        type: 'success',
        confirmButtonText: 'המשך'
      })

    })
    this.details = true;
    this.router.navigate(['/home'])
  }

}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../shared/services';
// import { User } from '../shared/models/user';
// import { SubjectJob } from '../shared/models/subjectJob';
// import { JobService } from '../shared/services/job.service';
// import { JobParameters } from '../shared/models/JobParameters';
// import Swal from 'sweetalert2'
// import { TimeSmartAgent } from '../shared/models/time';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { LoginUserComponent } from '../login/login-user/login-user.component';
// import { Title } from '@angular/platform-browser';
// @Component({
//   selector: 'app-smart-agent',
//   templateUrl: './smart-agent.component.html',
//   styleUrls: ['./smart-agent.component.css']
// })
// export class SmartAgentComponent implements OnInit {
//   currentUser: User = new User();
//   details: boolean;
//   user: boolean = false;

//   time: TimeSmartAgent[] = [
//     { id: 4, name: 'מיידי ' },
//     { id: 1, name: 'יומי' },
//     { id: 2, name: 'שבועי' },
//     { id: 3, name: 'חודשי ' },

//   ];
//   // private subjectJob: SubjectJob[];
//   private jobParameters: JobParameters = new JobParameters();
//   constructor(private router: Router,public titleService:Title, private userService: UserService, private jobService: JobService, public dialog: MatDialog) {
//     this.userService.userObs.subscribe(data => {
//       this.getUser(data);
//     })
//     // constructor() {
//       this.titleService.setTitle("סוכן חכם");
//     // }
//   }
//   ngOnInit() {
//     this.details = true;
//     this.getUser(this.userService.user);
//     this.jobService.getJobParameters().subscribe(state => {
//       this.jobParameters = state;

//     });
//     if (!localStorage.getItem("token")) {
//       this.user = false;
//       // const dialogRef = this.dialog.open(LoginUserComponent, {
//       //   height: '65vh',
//       //   width: '40vw'
//       // });
//       // dialogRef.afterClosed().subscribe(result => {
//       // });
//     }
//     else
//       this.user = true;
//   }

//   getUser(data) {
//     this.currentUser = data;
//   }


//   updateDetails() {
//     this.currentUser.UserIsSmartAgent = true;
//     this.userService.updateUser(this.currentUser).subscribe(res => {
//       this.userService.user = res;
//       Swal.fire({
//         title: 'הפרטים עודכנו בהצלחה!',
//         // text: this.name,
//         type: 'success',
//         confirmButtonText: 'המשך'
//       })
//     })
//     this.details = false;
//   }
// }
