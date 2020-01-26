import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  apiURL: string = 'http://localhost:53790/api/timer/';

  constructor(public httpClient: HttpClient) { }
timerSmartAgent(){
  debugger
  return this.httpClient.get(this.apiURL+'SetTimer');
}

}
