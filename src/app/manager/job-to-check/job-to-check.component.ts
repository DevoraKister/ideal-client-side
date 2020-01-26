import { Component, OnInit } from '@angular/core';
import { JobView } from 'src/app/shared/models/jobView';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { PageEvent, MatSnackBar, MatDialog } from '@angular/material';
import { AddCompanyComponent } from 'src/app/add-company/add-company.component';
import { JobService } from 'src/app/shared/services/job.service';
import { Company } from 'src/app/shared/models/company';

@Component({
  selector: 'app-job-to-check',
  templateUrl: './job-to-check.component.html',
  styleUrls: ['./job-to-check.component.css']
})
export class JobToCheckComponent implements OnInit {
  public allJobs: JobView[];
  public Jobs: JobView[];
  public length = 0;
  public pageSize = 8;
  public pageSizeOptions: number[] = null;
  public pageEvent: PageEvent;
  load: boolean = true;
  public Companies:Company[];
  constructor(public managerService: ManagerService,public jobService:JobService, public _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.load = true;
    this.managerService.getJobToCheck().subscribe(res => {
      this.allJobs = res;
      this.length = res.length;
      this.fillJobs(0);
      this.load = false;
    })
     this.jobService.getCompanies().subscribe(state => {
      this.Companies = state;
       this.jobService.getJobParameters().subscribe(state => {
        //this.jobParameters = state;
      });
    });

  }
  OKTheJob(JobId: number) {
    this.managerService.okTheCheck(JobId).subscribe(res => {
      this._snackBar.open("המשרה אושרה", 'X', { duration: 6000 });
      if (res) {
        this.managerService.getJobToCheck().subscribe(res => {
          this.allJobs = res;
          this.length = res.length;
          this.fillJobs(0);

        })
      }
    })
  }
  fillJobs(pageIndex) {
    this.Jobs = this.allJobs.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
  }
  getServerData(event) {
    this.fillJobs(event.pageIndex);
  }
  removeJob(jobId: number) {
    this.managerService.removeJob(jobId).subscribe(res => {
      this._snackBar.open("המשרה הוסרה בהצלחה", 'X', { duration: 6000 });
      if (res) {
        this.managerService.getJobsList().subscribe(res => {
          this.allJobs = res;
          this.length = res.length;
          this.fillJobs(0);

        })
      }
    })
  }
  showCompanyDetails(companyId) {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      // width: '250px',
      // height: '80vh',
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}

