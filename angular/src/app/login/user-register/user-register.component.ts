// דינה

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services'
import { Router } from '@angular/router';
import { from, Observable, observable, Subject } from 'rxjs';
import { City } from '../../shared/models/city';
import { JobService } from 'src/app/shared/services/job.service';
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { HttpParams } from '@angular/common/http';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2'
import { HeaderComponent } from 'src/app/header/header.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Part } from 'src/app/shared/models/part';
import { Area } from 'src/app/shared/models/area';
import { SubjectJob } from 'src/app/shared/models/subjectJob';
import { ErrorStateMatcher } from '@angular/material';
import * as  sha256 from 'async-sha256';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { AutocomleteValidateDirective } from 'src/app/directives/autocomlete-validate.directive';
import { Title } from '@angular/platform-browser';



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
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit
//  OnDestroy
{
  citiesGroup: FormControl = new FormControl();
  areasGroup: FormControl = new FormControl();
  currentUser: User = new User();
  public cities: City[];
  public parts: Part[];
  public subs: SubjectJob[];
  public areas: Area[];
  public jobParameters: JobParameters = new JobParameters();
  public cityText: string = "";
  public currentCity: string = "";
  public = new MyErrorStateMatcher();
  hashPassword: string;
  areaText: string;
  @ViewChild('autoGroup1') auto;
  // cities: City[] =  [];

  cityOptions: Observable<City[]>;
  partOptions: Observable<Part[]>;
  subOptions: Observable<SubjectJob[]>;
  areaOptions: Observable<Area[]>;

  public subscriber;
// emailControl=new FormControl('',[Validators.required,Validators.email]);
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

  constructor(public userService: UserService, public titleService: Title, public router: Router,
    public jobService: JobService, public header: HeaderComponent, public _formBuilder: FormBuilder) {
    this.titleService.setTitle("מחפשת משרה | הרשמה");

  }
//   getErrorMessageEmail(){
// return this.emailControl.hasError('required')?'אתה חייב להכניס ערך':
// this.emailControl.hasError('email')?'מייל לא תקין':'';
//   }
  ngOnInit() {
    this.subscriber = this.jobService.getJobParameters().subscribe(state => {
      this.jobParameters = state;
      this.cities = this.jobParameters.Cities;
      this.areas = this.jobParameters.Areas;
      this.parts = this.jobParameters.Parts;
      this.subs = this.jobParameters.SubjectJob;
      // this.cityOptions=this.jobParameters.Cities;
    });

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

  // serchByCityName(event){
  //   alert(this.cityOptions);
  //   this.cityOptions=this.cities.filter(p=>p.CityName.startsWith(event)==true)
  // }
  sub(id: number) {
    this.currentUser.UserSubId = id;
  }
  part(id: number) {
    this.currentUser.UserPartId = id;
  }
  city(id: number) {
    this.currentUser.UserCityId = id;
  }
  // cityName(text) {
  //   debugger;
  //   var city = this.cities.find(p => p.CityName ==text)
  //   if (city)
  //     this.currentUser.UserCityId = city.CityId;
  //   else
  // this.cityText="";
  // }
  // partName(name: string) {
  //   debugger;
  //   var id = this.parts.find(p => p.PartName == name).PartId;

  //   if (id)
  //   {  this.currentUser.UserPartId = id;
  //     return true
  //   }
  //  return false;
  // }
  // subName(name: string) {
  //   var id = this.subs.find(p => p.SubName == name).SubId;
  //   if (id)
  //     this.currentUser.UserSubId = id;
  //   else
  //     alert("j");
  // }
  areaName(area) {
    if (area)
      debugger
    var id = this.areas.find(p => p.AreaName == area);
    if (id)
      this.getCity(id.AreaId);
    else
      this.cities = null;
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

  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  async register(city, area, part, sub) {
    this.currentUser.password = await sha256(this.currentUser.password);
    localStorage.setItem("token", this.currentUser.password);
    this.currentUser.UserIsSmartAgent = false;
    // this.currentUser.= this.areas.find(p => p.AreaName == area).AreaId
    this.currentUser.UserPartId = this.parts.find(c => c.PartName == part.options.first.value).PartId;
    this.currentUser.UserCityId = this.cities.find(c => c.CityName == city.options.first.value).CityId;
    this.currentUser.UserSubId = this.subs.find(c => c.SubName == sub.options.first.value).SubId;
    this.currentUser.UserIsChizuk = true;


    this.userService.register(this.currentUser).subscribe(res => {
      let _formData = new FormData();
      let name = this.currentUser.UserMail;
      name += this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.'));;
      _formData.append("file", this.fileToUpload, name);
      this.userService.sendFile(_formData).subscribe(res => { })
      // console.log(this.fileToUpload);

      if (res) {

        this.router.navigate(['register/register-user']);
        debugger
        this.userService.user = res;
        this.userService.boss = null;
        localStorage.setItem("token", this.currentUser.password);
        // localStorage.setItem("UserPassword",this.currentUser.password);
        localStorage.setItem("UserMail", res.UserMail);
        localStorage.setItem("UserName", res.UserName);
        localStorage.setItem("UserId", res.UserId.toString());
        this.header.isUser();
        Swal.fire({
          title: 'ברוכה הבאה',
          text: 'נרשמת בהצלחה',
          type: 'success',
          confirmButtonText: 'המשך'
        })
        this.router.navigate(['home']);
      }
      else {
        Swal.fire({
          title: 'שגיאה!',
          text: 'ערכים לא נכונים!!!',
          type: 'error',
          confirmButtonText: 'מלא שוב'
        })
      }
    }
      ,
      err => {
      })
  }

  getCity(event) {

    this.jobService.getCity(event).subscribe(state => {
      this.cities = state;
      // this.cityOptions = observable<City[]>(state);
    });
  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  parts1 = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageParts(part) {

    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}











// דבורה
// import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { User } from '../../shared/models/user';
// import { UserService } from '../../shared/services'
// import { Router } from '@angular/router';
// import { from, Observable, observable, Subject } from 'rxjs';
// import { City } from '../../shared/models/city';
// import { JobService } from 'src/app/shared/services/job.service';
// import { JobParameters } from 'src/app/shared/models/JobParameters';
// import { HttpParams } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import Swal from 'sweetalert2'
// import { HeaderComponent } from 'src/app/header/header.component';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { startWith, map } from 'rxjs/operators';
// import { Part } from 'src/app/shared/models/part';
// import { Area } from 'src/app/shared/models/area';
// import { SubjectJob } from 'src/app/shared/models/subjectJob';
// import { ErrorStateMatcher } from '@angular/material';
// import * as  sha256 from 'async-sha256';
// import { AutofillMonitor } from '@angular/cdk/text-field';
// import { AutocomleteValidateDirective } from 'src/app/directives/autocomlete-validate.directive';



// export const _filter = (opt: string, value: string): string => {
//   const filterValue = value.toLowerCase();
//   if (opt.includes(filterValue)) {
//     return opt;

//   }
//   return "";
// };

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null): boolean {
//     return !!(control && control.invalid && (control.dirty || control.touched));
//   }
// }
// @Component({
//   selector: 'app-user-register',
//   templateUrl: './user-register.component.html',
//   styleUrls: ['./user-register.component.css']
// })

// export class UserRegisterComponent implements OnInit
// {
//   citiesGroup: FormControl = new FormControl();
//   areasGroup: FormControl = new FormControl();
//   currentUser: User = new User();
//   private cities: City[];
//   private parts: Part[];
//   private subs: SubjectJob[];
//   private areas: Area[];
//   private jobParameters: JobParameters = new JobParameters();
//   private cityText: string = "";
//   private currentCity: string = "";
//   matcher = new MyErrorStateMatcher();
//   hashPassword: string;
//   areaText:string;
//   @ViewChild('autoGroup1') auto;

//   cityOptions: Observable<City[]>;
//   partOptions: Observable<Part[]>;
//   subOptions: Observable<SubjectJob[]>;
//   areaOptions: Observable<Area[]>;

//   private subscriber;

//   citiesForm: FormGroup = this._formBuilder.group({
//     citiesGroup: ''
//   });
//   partsForm: FormGroup = this._formBuilder.group({
//     partsGroup: ''
//   });
//   subForm: FormGroup = this._formBuilder.group({
//     subsGroup: '',
//   });
//   areasForm: FormGroup = this._formBuilder.group({
//     areasGroup: '',
//   });

//   constructor(private userService: UserService, private router: Router, private jobService: JobService, private header: HeaderComponent, private _formBuilder: FormBuilder) { }

//   ngOnInit() {
//     this.subscriber = this.jobService.getJobParameters().subscribe(state => {
//       this.jobParameters = state;
//       this.cities = this.jobParameters.Cities;
//       this.areas = this.jobParameters.Areas;
//       this.parts = this.jobParameters.Parts;
//       this.subs = this.jobParameters.SubjectJob;

//     });

//     this.cityOptions = this.citiesForm.get('citiesGroup')!.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => this._filterGroup(value))
//       );
//     this.partOptions = this.partsForm.get('partsGroup')!.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => this._filterGroupPart(value))
//       );
//     this.subOptions = this.subForm.get('subsGroup')!.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => this._filterGroupSub(value))
//       );
//     this.areaOptions = this.areasForm.get('areasGroup')!.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => this._filterGroupArea(value))
//       );
//   }


//   private _filterGroup(value: string): City[] {
//     if (value) {
//       return this.cities
//         .map(city => ({ CityName: _filter(city.CityName, value) }))
//         .filter(city => city.CityName.length > 0);
//     }

//     return this.cities;
//   }
//   private _filterGroupPart(value: string): Part[] {
//     if (value) {
//       return this.parts
//         .map(part => ({ PartName: _filter(part.PartName, value) }))
//         .filter(part => part.PartName.length > 0);
//     }

//     return this.parts;
//   }
//   private _filterGroupSub(value: string): SubjectJob[] {
//     if (value) {
//       return this.subs
//         .map(sub => ({ SubName: _filter(sub.SubName, value) }))
//         .filter(sub => sub.SubName.length > 0);
//     }

//     return this.subs;
//   }
//   private _filterGroupArea(value: string): Area[] {
//     if (value) {
//       return this.areas
//         .map(area => ({ AreaName: _filter(area.AreaName, value) }))
//         .filter(area => area.AreaName.length > 0);
//     }

//     return this.areas;
//   }

//   sub(id: number) {
//     this.currentUser.UserSubId = id;
//   }
//   part(id: number) {
//     this.currentUser.UserPartId = id;
//   }
//   city(id: number) {
//     this.currentUser.UserCityId = id;
//   }

//   areaName() {
//   debugger;
//     var id = this.areas.find(p => p.AreaName == this.areaText).AreaId;
//     if (id)
//       this.getCity(id);
//       else
//       this.cities=null;
//   }
//   getCityNames() {
//     return this.cities ? this.cities.map(m => m.CityName) : [];
//   }
//   getAreaNames() {
//     return this.areas ? this.areas.map(m => m.AreaName) : [];
//   }
//   getSubNames() {
//     return this.subs ? this.subs.map(m => m.SubName) : [];
//   }
//   getPartNames() {
//     return this.parts ? this.parts.map(m => m.PartName) : [];
//   }

//   fileToUpload: File = null;
//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//   }
//   async register(city, area, part, sub) {
//     this.currentUser.password = await sha256(this.currentUser.password);
//     localStorage.setItem("token", this.currentUser.password);
//     this.currentUser.UserIsSmartAgent = false;
//     this.currentUser.UserPartId = this.parts.find(c => c.PartName == part.options.first.value).PartId;
//     this.currentUser.UserCityId = this.cities.find(c => c.CityName == city.options.first.value).CityId;
//     this.currentUser.UserSubId = this.subs.find(c => c.SubName == sub.options.first.value).SubId;



//     this.userService.register(this.currentUser).subscribe(res => {
//       let _formData = new FormData();
//       let name = this.currentUser.UserMail;
//       name += this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.'));;
//       _formData.append("file", this.fileToUpload, name);
//       this.userService.sendFile(_formData).subscribe(res => { })
//       console.log(this.fileToUpload);

//       if (res) {

//         this.router.navigate(['register/register-user']);
//         this.userService.user = res;
//         this.userService.boss = null;
//         localStorage.setItem("token", this.currentUser.password);
//         localStorage.setItem("UserMail", res.UserMail);
//         localStorage.setItem("UserName", res.UserName);
//         localStorage.setItem("UserId", res.UserId.toString());
//         this.header.isUser();
//         Swal.fire({
//           title: 'success!',
//           text: 'נרשמת בהצלחה!!!',
//           type: 'success',
//           confirmButtonText: 'המשך'
//         })
//         this.router.navigate(['home']);
//       }
//       else {
//         Swal.fire({
//           title: 'שגיאה!',
//           text: 'ערכים לא נכונים!!!',
//           type: 'error',
//           confirmButtonText: 'מלא שוב'
//         })
//       }
//     }
//       ,
//       err => {
//       })
//   }

//   getCity(event) {

//     this.jobService.getCity(event).subscribe(state => {
//       this.cities = state;
//     });
//   }


//   getErrorMessage() {
//     return this.email.hasError('required') ? 'You must enter a value' :
//       this.email.hasError('email') ? 'Not a valid email' :
//         '';
//   }
//   parts1 = new FormControl('', [Validators.required]);
//   email = new FormControl('', [Validators.required, Validators.email]);

//   getErrorMessageParts(part) {

//     return this.email.hasError('required') ? 'You must enter a value' :
//       this.email.hasError('email') ? 'Not a valid email' :
//         '';
//   }
// }










