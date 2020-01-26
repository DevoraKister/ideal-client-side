import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { City } from '../shared/models/city';
import { JobParameters } from '../shared/models/JobParameters';
import { JobService } from '../shared/services/job.service';
import { Title } from '@angular/platform-browser';


export const _filter = (opt: string, value: string): string => {
  const filterValue = value.toLowerCase();
  if(opt.includes(filterValue)){
    return opt;
  }
  return "";
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public jobParameters: JobParameters=new JobParameters();


  citiesForm: FormGroup = this._formBuilder.group({
    citiesGroup: '',
  });

  cities: City[] =  [];

  cityOptions: Observable<City[]>;

  constructor(public _formBuilder: FormBuilder,  public titleService:Title, public jobService: JobService) {
    this.titleService.setTitle("אודות");
  }

  ngOnInit() {
  }

}
