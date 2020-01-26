import { Component, OnInit } from '@angular/core';
import { Company } from '../shared/models/company';
import { Router } from '@angular/router';
import { JobService } from '../shared/services/job.service';
import { City } from '../shared/models/city';
import { JobParameters } from '../shared/models/JobParameters';
import { BossRegisterComponent } from '../login/boss-register/boss-register.component';
import Swal from 'sweetalert2'
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

export interface StateGroup {
  letter: string;
  names: string[];
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public cities: City[];
  public jobParameters:JobParameters;
  public currentCompany: Company = new Company();
  public subscriber;
  stateGroupOptions: Observable<StateGroup[]>;
  constructor(public router: Router, public jobService: JobService,
    public titleService:Title, public bossRe: BossRegisterComponent,public _formBuilder: FormBuilder) { 
    this.titleService.setTitle("הוספת חברה");

    }

  ngOnInit() {
    this.subscriber = this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;
    });
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
  }
  getCity(event) {
    this.jobService.getCity(event.target.value).subscribe(state => {

      this.cities = state;

    });
  }
  addCompanyParameters(area1) {
    this.currentCompany.CompanyAreaId = area1.value;
    this.jobService.addCompany(this.currentCompany).subscribe(res => {
      this.bossRe.company=res;
      Swal.fire({
        title: 'תודה',
        text: 'הוספת החברה התבצעה בהצלחה',
        type: 'success',
        confirmButtonText: 'המשך'
      })
      this.router.navigate(['home']);
    },
      err => { 
      },);
    if (localStorage.getItem("bossAddCompany")) {
      this.bossRe.notRegistered = false;
      this.router.navigate(['register/register-boss']);
      this.jobService.getCompanies().subscribe(state => {
        this.bossRe.company = state;
      } );
    }
}
  city(id: number) {
    this.currentCompany.CompanyCityId = id;
  }
//hhkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk?
stateForm: FormGroup = this._formBuilder.group({
  stateGroup: '',
});

stateGroups: StateGroup[] = [{
  letter: 'A',
  names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
}, {
  letter: 'C',
  names: ['California', 'Colorado', 'Connecticut']
}, {
  letter: 'D',
  names: ['Delaware']
}, {
  letter: 'F',
  names: ['Florida']
}, {
  letter: 'G',
  names: ['Georgia']
}, {
  letter: 'H',
  names: ['Hawaii']
}, {
  letter: 'I',
  names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
}, {
  letter: 'K',
  names: ['Kansas', 'Kentucky']
}, {
  letter: 'L',
  names: ['Louisiana']
}, {
  letter: 'M',
  names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana']
}, {
  letter: 'N',
  names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota']
}, {
  letter: 'O',
  names: ['Ohio', 'Oklahoma', 'Oregon']
}, {
  letter: 'P',
  names: ['Pennsylvania']
}, {
  letter: 'R',
  names: ['Rhode Island']
}, {
  letter: 'S',
  names: ['South Carolina', 'South Dakota']
}, {
  letter: 'T',
  names: ['Tennessee', 'Texas']
}, {
  letter: 'U',
  names: ['Utah']
}, {
  letter: 'V',
  names: ['Vermont', 'Virginia']
}, {
  letter: 'W',
  names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
}];






public _filterGroup(value: string): StateGroup[] {
  if (value) {
    return this.stateGroups
      .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
      .filter(group => group.names.length > 0);
  }

  return this.stateGroups;
}
}
