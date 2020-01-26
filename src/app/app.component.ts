import { Component, HostListener } from '@angular/core';
import { User } from './shared/models/user';
import { Boss } from './shared/models/boss';
import { UserService } from './shared/services/user.service'
import { from } from 'rxjs';
import * as FriendCard from '../assets/js2';
import { MatDialog } from '@angular/material';
import { SurveyComponent } from './survey/survey.component';
import { TimerService } from './shared/services/timer.service';

declare const name2: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User = new User();
  boss: Boss = new Boss();
  title = 'AngularIdial';
  manager: boolean = false;
  constructor(public dialog: MatDialog,public timerService:TimerService) {

    var id = localStorage.getItem("UserId");
    if (localStorage.getItem("manager"))
      this.manager = true;
    //   if(id!=null)
    //  this.getById(Number(id)).subscribe((res:User)=>{
    //      this.user=res;
    //  })
  }
  ngOnInit() {
    this.timerService.timerSmartAgent();
    var dialogRef;
    if(!localStorage.getItem("manager")){
    if (!localStorage.getItem("SurveyOpened") || localStorage.getItem("SurveyOpened") != "stop")
      setTimeout(() => {
        dialogRef = this.dialog.open(SurveyComponent, {
          // width: '250px',
          width: '70vw',
          height: '70vh',
        });
      }, 100000);


    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}


  onClick() {
    FriendCard.name2();
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
   
    //  // TODO: Cross browsing
    //  gotoJob() {
    //    window.scroll({ 
    //      top: 600, 
    //      left: 0, 
    //      behavior: 'smooth' 
    //    });
    //  }
     gotoTop() {
       window.scroll({ 
         top: 0, 
         left: 0, 
         behavior: 'smooth' 
       });
     }
   }

