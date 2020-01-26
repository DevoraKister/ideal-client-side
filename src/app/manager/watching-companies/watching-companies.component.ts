import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/models/company';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { JobService } from 'src/app/shared/services/job.service';


@Component({
  selector: 'app-watching-companies',
  templateUrl: './watching-companies.component.html',
  styleUrls: ['./watching-companies.component.css']
})
export class WatchingCompaniesComponent implements OnInit {

  constructor(public managerService: ManagerService,public jobService:JobService) { }
  Companies:Company[];
  city:string;
  public jobParameters: JobParameters=new JobParameters();
  public subscriber;

  ngOnInit() {
    this.subscriber = this.jobService.getCompanies().subscribe(state => {
      this.Companies = state;
      this.subscriber = this.jobService.getJobParameters().subscribe(state => {
        this.jobParameters = state;
      });
    });
  }

  removeCompany(idCompany:number)
  {
    this.managerService.removeCurrentCompany(idCompany).subscribe(state => {
     this.Companies=state;
      });
  }

}
