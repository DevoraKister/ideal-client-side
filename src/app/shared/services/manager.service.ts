import { Injectable } from '@angular/core';
import { } from '@angular/http'
import { from, Observable, observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { JobView } from '../models/jobView';
import { Recomend } from '../models/recomend';
import { Company } from '../models/company';
import { TopicQuestion } from '../models/topicQuestion';
import { Question } from '../models/question';
import { User } from '../models/user';
import { Statistics } from '../models/Statistics';
import { Boss } from '../models/boss';
import { Job } from '../models/job';
import { Adv } from '../models/adv';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  public  signedUser:User[];
  public  jobId:number;
  public  companyId:number;
  jobSign: JobView[];
  apiURL: string = 'http://localhost:53790/api/manager/';
  str: string;
  constructor(public httpClient: HttpClient) {
  }

  getJobToCheck(): Observable<JobView[]> {
    return this.httpClient.get<JobView[]>(this.apiURL+"JobsToCheck" );
  }
  okTheCheck(JobId) {
    return this.httpClient.get(this.apiURL+"OkTheCheck/"+JobId );
  }

  removeCurrentCompany(companyId:number):Observable<Company[]>{
    return this.httpClient.get<Company[]>(this.apiURL +'removeCompany/'+companyId);
  }

  getTopicQuestion():Observable<TopicQuestion[]>{
    return this.httpClient.get<TopicQuestion[]>(this.apiURL +'getTopicQuestion');

  }
  addQuestionfromRav(question):Observable<Question[]>{
    return this.httpClient.post<Question[]>(this.apiURL +'addAnswerfromRav',question);

  }
  deleteJob(JobId){
    return this.httpClient.delete<Question[]>(this.apiURL +'deleteJob',JobId);

  }
  jobsSigned(){
    return this.httpClient.get<JobView[]>(this.apiURL +'getTopicQuestion/');
  }
  listSignedJob():Observable<JobView[]>{
    return this.httpClient.get<JobView[]>(this.apiURL+'jobsSign/');
  }

  userSignedToSpecificJob(jobId):Observable<User[]>{
return this.httpClient.get<User[]>(this.apiURL+'userToSpecificJob/'+jobId);
  }
  getknowledge() {
    return this.httpClient.get<Statistics>(this.apiURL + 'getknowledge/');
  }
  sendCv(userId):Observable<JobView[]>{
    return this.httpClient.get<JobView[]>(this.apiURL+'sendCv/'+this.jobId+"/"+userId);
  }
  timerSmartAgent(){
    
  }

  deleteQuestion(idQustion){
    return this.httpClient.get<JobView[]>(this.apiURL+'removeQuestion/'+idQustion);

  }

  addAdv(adv:Adv){
    return this.httpClient.post(this.apiURL +'addAdv',adv);

  }
  sendFile(file): any {
    return this.httpClient.post(`${this.apiURL}/fileAdv`, file);
}
removeAdv(id:number){
  return this.httpClient.get<Adv[]>(this.apiURL +'removeAdv/'+id);

}

  // ---------------database------------------------
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + 'getAllUsers');
  }
  removeUser(userId: number): Observable<User[]> {
   
    return this.httpClient.get<User[]>(this.apiURL + 'removeUser/' + userId);
  }

  getBossList(): Observable<Boss[]> 
  {
    debugger;
    return this.httpClient.get<Boss[]>(this.apiURL + 'geBossList/');
  }
  getJobsList(): Observable<JobView[]> 
  {
    debugger;
    return this.httpClient.get<JobView[]>(this.apiURL + 'getJobsList/');
  }
  removeJob(jobId:number): Observable<JobView[]> 
  {
    debugger;
    return this.httpClient.get<JobView[]>(this.apiURL + 'removeJob/'+jobId);
  }
  getJobById(idJob1: number): Observable <Job> {
    return this.httpClient.get<Job>(this.apiURL + 'getJobById/'+idJob1);
  }

  removeBoss(bossId: any):Observable<Boss[]> {
    return this.httpClient.get<Boss[]>(this.apiURL + 'removeBoss/' + bossId);
  }

}
