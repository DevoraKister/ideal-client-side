import { Component, OnInit } from '@angular/core';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { JobService } from 'src/app/shared/services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Boss } from 'src/app/shared/models/boss';
import { Company } from 'src/app/shared/models/company';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/shared/services';
@Component({
  selector: 'app-bossdetails',
  templateUrl: './bossdetails.component.html',
  styleUrls: ['./bossdetails.component.css']
})
export class BossdetailsComponent implements OnInit {
  public allBoss: Boss[];
  public bossList: Boss[] = null;
  idBoss: any;
  company: Company[];
  public length = 0;
  public pageSize = 8;
  public pageSizeOptions: number[] = null;
  public pageEvent: PageEvent;

  public jobParameters: JobParameters = new JobParameters();

  constructor(public managerService: ManagerService, public userService: UserService,
    public router:Router, public jobService: JobService, public route: ActivatedRoute, public _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.managerService.getBossList().subscribe(res => {
      this.allBoss = res;
      this.length = res.length;
      this.fillJobs(0);

      this.jobService.getJobParameters().subscribe(s => {
        this.jobParameters = s;
        this.jobService.getCompanies().subscribe(su => {
          this.company = su;
        });
      });
    });
  }
  fillJobs(pageIndex) {
    this.bossList = this.allBoss.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
  }
  getServerData(event) {
    this.fillJobs(event.pageIndex);
  }
  editBoss(bossId) {
    this.jobService.bossId=bossId;
    this.router.navigate(['/database/update-boss']);

  }
  addBoss(){
    this.router.navigate(['/login/register-boss'])
  }
  removeBoss(userId: number) {
    this.managerService.removeUser(userId).subscribe(res => {
      this._snackBar.open("המפרסם הוסר בהצלחה", 'X', { duration: 6000 });
      if (res) {
        this.managerService.getBossList().subscribe(res => {
          this.allBoss = res;
          this.length = res.length;
          this.fillJobs(0);
        })
      }
    })
  }
}

















