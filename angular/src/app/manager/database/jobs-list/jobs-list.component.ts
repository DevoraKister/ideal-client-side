import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { JobService } from 'src/app/shared/services/job.service';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { Router } from '@angular/router';
import { JobView } from 'src/app/shared/models/jobView';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  public length = 0;
  public pageSize = 8;
  public pageSizeOptions: number[] = null;
  public pageEvent: PageEvent;
  public allJobs: JobView[];
  public jobs: JobView[]; 
  
  public jobParameters: JobParameters;
  constructor(public managerService: ManagerService, public _snackBar: MatSnackBar, public jobService: JobService, public router: Router) 
  { }

  ngOnInit() 
  {

    this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;

      this.managerService.getJobsList().subscribe(res => {
        this.allJobs = res;
        this.length = res.length;
        this.fillJobs(0);
      });
    });
  }

  fillJobs(pageIndex) 
  {
    this.jobs = this.allJobs.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
  }
  getServerData(event)
   {
    this.fillJobs(event.pageIndex);
  }

  removeJob(jobId: number) 
  {
    this.managerService.removeJob(jobId).subscribe(res => 
      {
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
  editJob(idJob: number)
   {
    //this.jobService.userId=id
    this.jobService.jobId=idJob;
    this.router.navigate(['database/edit-job/']);
  }

}


 
  
  
