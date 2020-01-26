import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';
import { JobService } from '../shared/services/job.service';
import { JobView } from '../shared/models/jobView';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  myJobs: JobView[] = new Array;
  isBoss: boolean = false;
  public more: boolean = true;
  isByUs: boolean = true;
  constructor(public userService: UserService, public jobService: JobService, public titleService:Title,public snackBar: MatSnackBar) { 
    this.titleService.setTitle("אזור אישי");

  }

  ngOnInit() {
    if (localStorage.getItem("UserId"))
      if (localStorage.getItem("isBoss"))
        this.jobService.getMyJobsBoss(parseInt(localStorage.getItem("UserId"))).subscribe(res => {
          this.isBoss = true;//if the current user is boss
          this.myJobs = res;

        });
      else
        this.jobService.getMyJobsUser(parseInt(localStorage.getItem("UserId"))).subscribe(res => {
          this.myJobs = res;

        });
        
  }
  closeJob(jobId: number) {
    debugger;
    this.jobService.closeJob(jobId, this.isByUs).subscribe(res => {
      if (res) {
        this.myJobs = res;
        this.snackBar.open("המשרה הוסרה בהצלחה", "X", { duration: 600 });
      }
      else
        this.snackBar.open("תקלה במערכת, נסו שוב", "X", { duration: 600 });

    })
  }
  dataSource: any;
  registerToJob(idJob) {
    if (localStorage.getItem("token"))
      this.userService.registerToJob(idJob, this.userService.user.UserId).subscribe(res => {
        if (res) {
          this.snackBar.open('נרשמת בהצלחה', 'X', { duration: 3000 });
          // הוספה למשרות שנרשם  

        }
        else {
          this.snackBar.open('תקלה במערכת. נסי שוב מאוחר יותר', 'X', { duration: 6000 });
        }
      })
  }
}
