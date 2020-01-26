import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Adv } from '../models/adv';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvService {
  apiURL: string = 'http://localhost:53790/Api/Adv/';

  constructor(public httpClient: HttpClient) { }
  getAdvs(): Observable<Adv[]> {
    return this.httpClient.get<Adv[]>(this.apiURL + 'getAdvs');
  }
}
