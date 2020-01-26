import { Injectable } from '@angular/core';
import { } from '@angular/http'
import { from, Observable, observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import { Url } from 'url';
import { Job } from "src/app/shared/models/job";
import { Part } from "src/app/shared/models/part";
import { JobParameters } from "src/app/shared/models/JobParameters";
import { City } from '../models/city';
import { JobView } from '../models/jobView';
import { Company } from '../models/company';
import { Survey } from '../models/survey';
import { SubjectJob } from '../models/subjectJob';
import { Recomend } from '../models/recomend';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  userId:number;
  jobId:number;
bossId:number;  



  apiURL: string = 'http://localhost:53790/Job/api/';

  str: string;
  currentJobId: number = 0;
  constructor(public httpClient: HttpClient) {
  }

  getJobParameters(): Observable<JobParameters> {
    return this.httpClient.get<JobParameters>(this.apiURL + 'jobParameters');
  }
  getSubJob(): Observable<SubjectJob[]> {
    return this.httpClient.get<SubjectJob[]>(this.apiURL + 'getSubjectJob');
  }
  getAllJobs(city1, area1, part1, sub1): Observable<JobView[]> {
    // return this.httpClient.get<Job[]>(`${this.apiURL}/JobsByParameters`+city1+area1+part1+sub1);
    return this.httpClient.get<JobView[]>(this.apiURL + 'JobsByParameters/' + city1 + '/' + area1 + '/' + part1 + '/' + sub1);
  }

  getNewJobs(): Observable<JobView[]> {
    return this.httpClient.get<JobView[]>(this.apiURL + 'NewJobs/');
  }
  getMyJobsBoss(idBoss:number): Observable<JobView[]> {
    return this.httpClient.get<JobView[]>(this.apiURL + 'getJobsByBossId/'+idBoss);
  }
  
  getMyJobsUser(iduser:number): Observable<JobView[]> {
    return this.httpClient.get<JobView[]>(this.apiURL + 'getJobsUserSigned/'+iduser);
  }
  // }
  getCity(areaId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(this.apiURL + 'getCity/' + areaId);
  }
  //--------------------------------------להוספת הצעת עבודה חדשה-------------------------------------------
  addJob(job: Job) {
    return this.httpClient.post(this.apiURL + 'AddJob', job);
  }

  //--------------------------------------------להוספת חברה חדשה----------------------------------------
  addCompany(company: Company) {
    return this.httpClient.post<Company[]>(this.apiURL + 'AddCompany', company);
  }
  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.apiURL + 'getCompany/');
  }
  sendSurvey(survey: Survey) {
    return this.httpClient.post(this.apiURL + 'addSurvey', survey);

  }
  //נרשם למשרה
  signJob(survey: Survey) {
    return this.httpClient.post(this.apiURL + 'addSurvey', survey);

  }
  addRecomend(recomend: Recomend) {
    return this.httpClient.post(this.apiURL + 'addNewRecomend', recomend);
  }
  getRecommendToJob(idJob: number): Observable<Recomend[]> {
    return this.httpClient.get<Recomend[]>(this.apiURL + 'getRecommendsToCurrentJob/' + idJob);
  }
  getSomeJob(data: number[]): Observable<JobView[]> {
    return this.httpClient.post<JobView[]>(this.apiURL + 'getSomeJob/', data);

  }
  signToSomeJob(listIdJob: number[]) {
    return this.httpClient.post(this.apiURL + 'signToSomeJob/', listIdJob);
  }

  closeJob(jobId: number, isByUs: boolean) {
    return this.httpClient.get<JobView[]>(this.apiURL + 'CloseJob/' + jobId+'/'+isByUs);
  }
}
