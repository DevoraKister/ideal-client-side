import { Component, OnInit } from '@angular/core';
import { JobView } from 'src/app/shared/models/jobView';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { JobService } from 'src/app/shared/services/job.service';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  public length = 0;
  public pageSize = 8;
  public pageSizeOptions: number[] = null;
  public pageEvent: PageEvent;
  public allUsers: User[];
  public users: User[];

  public jobParameters: JobParameters;
  constructor(public managerService: ManagerService, public _snackBar: MatSnackBar, public jobService: JobService, public router: Router) { }

  ngOnInit() {
    this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;

      this.managerService.getUsers().subscribe(res => {
        this.allUsers = res;
        this.length = res.length;
        this.fillJobs(0);
      });
    });
  }
  fillJobs(pageIndex) {
    this.users = this.allUsers.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
  }
  getServerData(event) {
    this.fillJobs(event.pageIndex);
  }

  editUser() {

  }
  removeUser(userId: number) {
    this.managerService.removeUser(userId).subscribe(res => 
      {
      this._snackBar.open("המשתמש הוסר בהצלחה", 'X', { duration: 6000 });
      if (res) {
        this.managerService.getUsers().subscribe(res => {
          this.allUsers = res;
          this.length = res.length;
          this.fillJobs(0);

        })
      }
    })
  }
  edit(id: number) {
    this.jobService.userId=id;
    this.router.navigate(['database/userdetails/']);
  }
  addUser(){
    this.router.navigate(['login/register-user/']);
  }

}



