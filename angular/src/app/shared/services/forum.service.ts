import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { TopicQuestion } from '../models/topicQuestion';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  apiURL: string = 'http://localhost:53790/api/forum';
  constructor(public http: HttpClient) { }

  askQuetion(question:Question){
    return this.http.post(`${this.apiURL}/AddQuestion`, question);

  }
getForum():Observable<Question[]>{
  return this.http.get<Question[]>(`${this.apiURL}/getAllQuestion`);
}
questionTopic():Observable<TopicQuestion[]> {
  return this.http.get<TopicQuestion[]>(`${this.apiURL}/getTopicQuestion`);
}
addAnswer( answer: any) {
  return this.http.post(`${this.apiURL}/addAnswer`,answer);

}

}
