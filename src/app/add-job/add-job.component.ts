import { Component, OnInit } from '@angular/core';
import { JobView } from '../shared/models/jobView';
import { JobParameters } from '../shared/models/JobParameters';
import { JobService } from 'src/app/shared/services/job.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Job } from '../shared/models/job';
import { Title } from '@angular/platform-browser';
import { Company } from '../shared/models/company';
import { Boss } from '../shared/models/boss';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  public company: Company[];
  public currentJob: Job = new Job();
  public jobparam: JobParameters;
  public subscriber;
  public isManager: boolean = false;
  companyId:number;
  companyName: string;
  currentBoss: Boss = new Boss();
  constructor(public jobservice: JobService, public titleService: Title, public router: Router) {
    this.titleService.setTitle("שיתוף משרה");
  }

  ngOnInit() {
    if (localStorage.getItem("manager"))
      this.isManager = true;
    this.subscriber = this.jobservice.getJobParameters().subscribe(state => {
      this.jobparam = state;
      if (!this.isManager)
        this.jobservice.getCompanies().subscribe(res => {
          // this.company = state;
          this.companyName = res.find(p => p.CompanyId == parseInt(localStorage.getItem("BossCompanyId"))).CompanyName;
        })
      else {
        this.jobservice.getCompanies().subscribe(state => {
          this.company = state;
          // this.currentBoss=this.userService.boss;
        });
      }

    });
    this.subscriber = this.jobservice.getCompanies().subscribe(state => {
      this.company = state;
      // this.currentBoss=this.userService.boss;
    });
  }
  j: Job = new Job();

  addParts(Workspace, outnet, parts, subjectjob, role, describe, require, experience) {
    // newjob.JobDateAdv = DateTime.Now;
    // newjob.JobDescribe = jobView.JobDescribe;
    // newjob.JobExperience = jobView.JobExperience;
    // newjob.JobPartId = jobView.JobPartId;
    // newjob.JobPartOutNetId =  jobView.JobPartOutNetId;
    // newjob.JobRole = jobView.JobRole;
    // newjob.JobCompanyId = jobView.JobCompanyId;
    // newjob.JobBossId = jobView.JobBossId;
    // //newjob.JobStars

    // newjob.JobStatus = false;

    // newjob.JobSubId = jobView.JobSubId;
    // newjob.JobWorkspaceId = jobView.JobWorkspaceId;
    // newjob.JobRequire = jobView.JobRequire;
    // db.Job.Add(Entities.Job.JobDAL(newjob));
    // db.SaveChanges();
    debugger;
    this.currentJob.JobWorkspaceId = Workspace.value;
    this.currentJob.JobPartOutNetId = outnet.value;
    this.currentJob.JobPartId = parts.value;
    this.currentJob.JobSubId = subjectjob.value;
    this.currentJob.JobRole = role.value;
    this.currentJob.JobDescribe = describe.value;
    this.currentJob.JobRequire = require.value;
    this.currentJob.JobExperience = parseInt(experience.value);
    if (!this.isManager)
      this.currentJob.JobCompanyId = parseInt(localStorage.getItem("BossCompanyId"));
    else
    this.currentJob.JobCompanyId = this.companyId;
      debugger;
    // this.currentJob.CompanyId=parseInt(localStorage.getItem("BossCompanyId"));
    if (!this.isManager)
      this.currentJob.JobBossId = parseInt(localStorage.getItem("UserId"));
    else
      this.currentJob.JobBossId = 1;
    debugger
    this.add();
  }
  company1(id: number) {
    this.currentBoss.BossCompanyId = id;

  }
  add() {
    this.jobservice.addJob(this.currentJob).subscribe(res => {
      Swal.fire({
        title: 'תודה על השיתוף',
        text: 'המשרה התוספה בהצלחה',
        type: 'success',
        confirmButtonText: 'המשך'
      })
      this.router.navigate(['home']);
    },
      err => { })
  }
  addCompany() {
    //  this.userService.keepBoss(this.currentBoss);
    //  this.notRegistered= true;
    // const dialogRef = this.dialog.open(AddCompanyComponent, {
    //   // width: '70vw',
    //   // height: '80vh',
    // });
    // dialogRef.afterClosed().subscribe(result => { });

    localStorage.setItem("bossAddCompany", "1");

  }
}