import { Component, OnInit, Input, Inject } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recomend } from '../shared/models/recomend';
import { MatDialogRef } from '@angular/material';
import { Company } from '../shared/models/company';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog/typings/public-api';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { JobTableComponent } from '../home/job-table/job-table.component';
export interface DialogData {
  animal: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-recommends-show',
  templateUrl: './recommends-show.component.html',
  styleUrls: ['./recommends-show.component.css']


})

export class RecommendsShowComponent implements OnInit {
  // @Input() idJob: number;
  recommendList: Recomend[];
  currentRecomend: Recomend = new Recomend();
  IdJob: number;
  Companies: Company[];
  numRec: number = 0;
  constructor(public jobService: JobService, public router: Router, public route: ActivatedRoute,
    public dialogRef: MatDialogRef<RecommendsShowComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    // this.route.snapshot.params["id"];
    // this.IdJob=parseInt( this.route.snapshot.params["id"]);
    this.IdJob = this.jobService.currentJobId;
    // this.currentRecomend.RecomemdCompanyId=id;
    this.currentRecomend.RecomendUserId = parseInt(localStorage.getItem("UserId"));
    debugger;
    this.jobService.getRecommendToJob(this.IdJob).subscribe(res => {
      // this.jobService.getRecommendToJob(this.IdJob).subscribe(res=>{
      if (res && res.length>0) {
        
        this.recommendList = res.filter(p => p.RecomendInfo != null);
        this.currentRecomend.RecomemdCompanyId = res[0].RecomemdCompanyId;
      }

      this.numRec = this.recommendList.length;
    });

  }
  addRecomend() {
    // this.currentRecomend.RecomemdCompanyId=i
    if (this.currentRecomend.RecomemdCompanyId === undefined) {
      
      var data = [this.IdJob];
      this.jobService.getSomeJob(data).subscribe(res => {
        this.currentRecomend.RecomemdCompanyId = res[0].CompanyId
        this.jobService.addRecomend(this.currentRecomend).subscribe(res => {
          if (res) {
            this.onNoClick();
          }
        });
      })
    }
    else
      this.jobService.addRecomend(this.currentRecomend).subscribe(res => {
        if (res) {
          this.onNoClick();
        }
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  company(id: number) {

  }

}
