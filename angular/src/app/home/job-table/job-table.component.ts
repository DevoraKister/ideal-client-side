import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Part } from 'src/app/shared/models/part';
import { JobService } from 'src/app/shared/services/job.service';
import { Area } from 'src/app/shared/models/area';
import { City } from 'src/app/shared/models/city';
import { SubjectJob } from 'src/app/shared/models/subjectJob';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { UserService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';
import { JobView } from 'src/app/shared/models/jobView';
import { PageEvent } from '@angular/material/paginator';
import { Recomend } from 'src/app/shared/models/recomend';
import { MatDialog } from '@angular/material/dialog';
import { RecommendsShowComponent } from 'src/app/recommends-show/recommends-show.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SignToJobComponent } from 'src/app/sign-to-job/sign-to-job.component';
import { MatSnackBar, MatTableDataSource, ErrorStateMatcher } from '@angular/material';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogConfig } from "@angular/material";
import { LoginUserComponent } from 'src/app/login/login-user/login-user.component';
// import {FormControl, Validators} from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const _filter = (opt: string, value: string): string => {
  const filterValue = value.toLowerCase();
  if (opt.includes(filterValue)) {
    return opt;

  }
  return "";
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})



export class JobTableComponent implements OnInit {
  public cities: City[];
  public jobParameters: JobParameters;
  public jobs: JobView[];
  public allJobs: JobView[];
  public recommendList: Recomend[];
  public subscriber;
public cityId = 1;
public length = -1;
public pageSize = 8;
public pageSizeOptions: number[] = null;
public pageEvent: PageEvent;
  public load: boolean;
  public more: boolean = true;
  currentRate = 8;
  // kjkjk
  citiesGroup: FormControl = new FormControl();
  areasGroup: FormControl = new FormControl();
  // currentUser: User = new User();
  // private cities: City[];
  public parts: Part[];
  public subs: SubjectJob[];
  public areas: Area[];
  // private jobParameters: JobParameters = new JobParameters();
  public cityText: string = "";
  public currentCity: string = "";
  matcher = new MyErrorStateMatcher();
  hashPassword: string;
  areaText: string;
  @ViewChild('autoGroup1') auto;
  // cities: City[] =  [];
  positionOptions: TooltipPosition[] = ['above', 'before', 'after', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(public userService: UserService, public _snackBar: MatSnackBar,
    public _formBuilder: FormBuilder, public router: Router, public jobService: JobService,
    public dialog: MatDialog,
    public showRecommend: RecommendsShowComponent) { }
  cityOptions: Observable<City[]>;
  partOptions: Observable<Part[]>;
  subOptions: Observable<SubjectJob[]>;
  areaOptions: Observable<Area[]>;

  // private subscriber;

  citiesForm: FormGroup = this._formBuilder.group({
    citiesGroup: ''
  });
  partsForm: FormGroup = this._formBuilder.group({
    partsGroup: ''
  });
  subForm: FormGroup = this._formBuilder.group({
    subsGroup: '',
  });
  areasForm: FormGroup = this._formBuilder.group({
    areasGroup: '',
  });
  ngOnInit() {
    this.userService.countEnterUser().subscribe(res=>{// בתחול מס משתמשים באתר 
    });
    
    this.load = true;
    this.subscriber = this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;
      this.cities = this.jobParameters.Cities;
      this.subs = this.jobParameters.SubjectJob;
      // this.cityOptions=this.cities;
      this.jobService.getNewJobs().subscribe(s => {
        this.load = false;
        this.jobs = s;
        this.allJobs = s;
        this.length = s.length;
        this.fillJobs(0);

      });
    });
    if (localStorage.getItem("myJobs")) {
      this.dataSource = JSON.parse(localStorage.getItem("myJobs"));
    }
    this.cityOptions = this.citiesForm.get('citiesGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.partOptions = this.partsForm.get('partsGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroupPart(value))
      );
    this.subOptions = this.subForm.get('subsGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroupSub(value))
      );
    this.areaOptions = this.areasForm.get('areasGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroupArea(value))
      );
  }







  public _filterGroup(value: string): City[] {
    if (value) {
      return this.cities
        .map(city => ({ CityName: _filter(city.CityName, value) }))
        .filter(city => city.CityName.length > 0);
    }

    return this.cities;
  }
  public _filterGroupPart(value: string): Part[] {
    if (value) {
      return this.parts
        .map(part => ({ PartName: _filter(part.PartName, value) }))
        .filter(part => part.PartName.length > 0);
    }

    return this.parts;
  }
  public _filterGroupSub(value: string): SubjectJob[] {
    if (value) {
      return this.subs
        .map(sub => ({ SubName: _filter(sub.SubName, value) }))
        .filter(sub => sub.SubName.length > 0);
    }

    return this.subs;
  }
  public _filterGroupArea(value: string): Area[] {
    if (value) {
      return this.areas
        .map(area => ({ AreaName: _filter(area.AreaName, value) }))
        .filter(area => area.AreaName.length > 0);
    }

    return this.areas;
  }
  areaName() {
    var id = this.areas.find(p => p.AreaName == this.areaText).AreaId;
    if (id)
      this.getCity(id);
    else
      this.cities = null;
  }
  cityName(text) {
    debugger;
    var city = this.cities.find(p => p.CityName == text)
    if (city)
      return city.CityId;
    else
      return 1;
  }
  subName(name: string) {
    var id = this.subs.find(p => p.SubName == name).SubId;
    if (id)
      return id;
    else
      return 0;
  }
  getCityNames() {
    return this.cities ? this.cities.map(m => m.CityName) : [];
  }
  getAreaNames() {
    return this.areas ? this.areas.map(m => m.AreaName) : [];
  }
  getSubNames() {
    return this.subs ? this.subs.map(m => m.SubName) : [];
  }
  getPartNames() {
    return this.parts ? this.parts.map(m => m.PartName) : [];
  }
  getCity(event) {
    debugger
    if (event.value)
      this.jobService.getCity(event.value).subscribe(state => {
        this.cities = state;
      });
  }
  getJobs(area1, part1, sub1, city1) {
    debugger;
    this.load = true;
    //בדיקת הערכים. אם לא בחרו מאתחל ב1
    if (city1.options.first != undefined)
      var cityId = this.cityName(city1.options.first.value);
    else cityId = 1;
    if (sub1.options.first != undefined)
      var subId = this.subName(sub1.options.first.value);
    else subId = 0;
    area1.value == undefined ? area1 = 1 : area1 = area1.value;
    part1.value == undefined ? part1 = 0 : part1 = part1.value;
    // sub1.options.first == undefined ? sub1 = 1 : sub1 = sub1.options.first.value;


    this.jobService.getAllJobs(cityId, area1, part1, subId).subscribe(state => {
      this.allJobs = state;
      this.length = state.length;
      this.fillJobs(0);
      this.load = false;
    });
  }
  j;
  fillJobs(pageIndex) {
    this.jobs = this.allJobs.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize);
    if (localStorage.getItem("myJobs"))
      for (let i = 0; i < this.jobs.length; i++) {
        this.j = 0;
        for (this.j = 0; this.j < this.dataSource.length; this.j++) {
          if (this.jobs[i].JobId == this.dataSource[this.j]) {
            this.jobs[i].JobSigned = true;
            break;
          }
        }
      }
  }


  getServerData(event) {
    this.fillJobs(event.pageIndex);
  }
  city(id: number) {
    this.cityId = id;
    //this.   .CompanyCityId=id;
  }
  dataSource: any;
  subjectBasket;
  registerToJob(idJob: number) {
    debugger
    if (localStorage.getItem("token") == null || localStorage.getItem("isBoss")) {
      const dialogRef = this.dialog.open(LoginUserComponent, {
        width: '50vw',
        // height: '80vh',
      });
      dialogRef.afterClosed().subscribe(result => { });
    }
    else {
      this.userService.registerToJob(idJob, this.userService.user.UserId).subscribe(res => {
        if (res) {
          this._snackBar.open('נרשמת בהצלחה', 'X', { duration: 3000 });
          // הוספה למשרות שנרשם  
          this.allJobs.find(p => p.JobId == idJob).JobSigned = true;
          if (!localStorage.getItem("myJobs")) {// אם עדיין אין משרות שנרשם אליהם   
            this.dataSource = [];
            this.dataSource.push(idJob);
          }
          else {
            this.dataSource = JSON.parse(localStorage.getItem("myJobs"));//שליפת המשרות   
            this.dataSource.push(idJob);
          }
          localStorage.setItem("myJobs", JSON.stringify(this.dataSource));
          this.subjectBasket.next(this.dataSource.length);// העברה של המידע שהיה שינוי  
        }
        else {
          this._snackBar.open('תקלה במערכת. נסי שוב מאוחר יותר', 'X', { duration: 6000 });
        }
      })
    }
  }
  UpdateDetails(idJob: number) {
    debugger
    if (localStorage.getItem("token") == null || localStorage.getItem("isBoss")) {
      const dialogRef = this.dialog.open(LoginUserComponent, {
        // width: '250px',
        // height: '80vh',
        width:'50vw',
      });
      dialogRef.afterClosed().subscribe(result => { });
    }
    else {
      const dialogRef = this.dialog.open(SignToJobComponent, {
        height: '80vh',
        data: { id: idJob },
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }


  // getRecommend(id: number) {
  // //  this.  dialogConfig.autoFocus = true;
  // const dialogConfig = new MatDialogConfig();
  //  dialogConfig.disableClose = false;

  // //  dialogConfig.data = {
  // //     idJob: id,

  // //   };

  //   this.dialog.open(RecommendsShowComponent, dialogConfig);
  //   // dialogConfig.afterClosed().subscribe(result => {});
  // }

  getRecommend(idJob: number) {
    // this.jobService.getRecommendToJob(idJob).subscribe(res => {
    //   this.showRecommend.recommendList = res;
    // לבדוק
    this.jobService.currentJobId = idJob;
    const dialogRef = this.dialog.open(RecommendsShowComponent, {
      // width: '250px',
      height: '70vh',
      // data: { idJob: idJob },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
    // });
  }
  // scroll-------------------------------
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  gotoJob() {
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth'
    });
  }
}

