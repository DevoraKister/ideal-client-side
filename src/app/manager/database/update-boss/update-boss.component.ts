import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { UserService } from 'src/app/shared/services';
import { JobService } from 'src/app/shared/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Boss } from 'src/app/shared/models/boss';
import { Company } from 'src/app/shared/models/company';
@Component({
  selector: 'app-update-boss',
  templateUrl: './update-boss.component.html',
  styleUrls: ['./update-boss.component.css']
})
export class UpdateBossComponent implements OnInit {
  currentBoss: Boss = new Boss();
  idBoss: any;
  company: Company[];
  public jobParameters: JobParameters = new JobParameters();
  constructor(public userService: UserService, public jobService: JobService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.GetBossById(this.jobService.bossId).subscribe(res => {
      this.currentBoss = res;
      this.jobService.getJobParameters().subscribe(s => {
        this.jobParameters = s;
        this.jobService.getCompanies().subscribe(su => {
          this.company = su;
        });
      });
    });
  }
  updateDetails() {

    this.userService.updateBoss(this.currentBoss).subscribe(res => {
      this.userService.boss = res;
      Swal.fire({
        title: 'הפרטים עודכנו בהצלחה!',
        // text: this.name,
        type: 'success',
        confirmButtonText: 'המשך'
      })
    })
  }
}

