import { Component, OnInit } from '@angular/core';
import { Recomend } from '../shared/models/recomend';
import { Company } from '../shared/models/company';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-recomend',
  templateUrl: './recomend.component.html',
  styleUrls: ['./recomend.component.css']
})
export class RecomendComponent implements OnInit 
{
  currentRecomend:Recomend=new Recomend();

  Companies:Company[];
  public subscriber;

  constructor( public jobService: JobService) { }
  ngOnInit() {

    this.subscriber = this.jobService.getCompanies().subscribe(state => {
      this.Companies = state;
    });
  }
  company(id: number) {
    this.currentRecomend.RecomemdCompanyId=id;
    this.currentRecomend.RecomendUserId=parseInt(localStorage.getItem("UserId"));
  }
  addRecomend(){
    this.subscriber = this.jobService.addRecomend(this.currentRecomend).subscribe(state => {
     
    });
  }
}
