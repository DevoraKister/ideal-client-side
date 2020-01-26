import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { JobView } from '../shared/models/jobView';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'querystring';
import { JobTableComponent } from '../home/job-table/job-table.component';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-show-one-job',
  templateUrl: './show-one-job.component.html',
  styleUrls: ['./show-one-job.component.css']
})
export class ShowOneJobComponent implements OnInit {
  // @Input() data: number[];
  listIdJob: number[] = new Array;
  str: string;
  jobs: JobView[];
  durationInSeconds = 2;
p
  constructor(public jobService: JobService, public _snackBar: MatSnackBar,
    public router: Router, public route: ActivatedRoute, public jobTable: JobTableComponent) {
    // route.params.subscribe(params=>{
    // this.listIdJob=JSON.parse(params['list']);
    debugger;
    this.str = this.route.snapshot.params["str"];
    var s = "";
    for (let i = 0; i < this.str.length; i++) {
      if (this.str[i] != 'A')
        s += this.str[i];
      else {
        var num = parseInt(s);
        this.listIdJob.push(num);
        s = "";
      }
    }
    // }); 
  }

  ngOnInit() {
    this.jobService.getSomeJob(this.listIdJob).subscribe(res => {
      this.jobs = res;
      this.jobTable.dataSource = JSON.parse(localStorage.getItem("myJobs"));
    })
  }
  signToSomeJob() {
    var temp = this.listIdJob[0];
    this.listIdJob[0] = parseInt(localStorage.getItem("UserId"));
    this.listIdJob.push(temp);
    this.jobService.signToSomeJob(this.listIdJob).subscribe(res => {
      if (res) {
        debugger
        this._snackBar.open('נרשמת בהצלחה', 'קבלתי', { duration: 3000 });
        this.router.navigate(['/home/job-table']);
        if (!localStorage.getItem("myJobs")) {// אם עדיין אין סל   
          this.jobTable.dataSource = [];
        }
        else {
          this.jobTable.dataSource = JSON.parse(localStorage.getItem("myJobs"));//שליפה של הסל  ' מהלוקל סטורג   
        }
        for (let index = 0; index < this.listIdJob.length; index++) {
          this.jobTable.dataSource.push(this.listIdJob[index]);
          // this.jobTable.allJobs.find(p => p.JobId == this.listIdJob[index]).JobSigned = true;
        }
        localStorage.setItem("myJobs", JSON.stringify(this.jobTable.dataSource));// שמירת הסל  בלוקל סטורג' של מחשב הקלינט   
        this.jobTable.subjectBasket.next(this.jobTable.dataSource.length);// העברה של המידע שהיה שינוי בסל  


      }
      else {
        this._snackBar.open('ארע שגיאה. נסי בשנית', 'קבלתי');

      }

    })
  }
}

