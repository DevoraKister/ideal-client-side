import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router,public titleService:Title) {
    this.titleService.setTitle("דרושות | מאגר המשרות הגדול לעובדת החרדית | חיפוש עבודה כשרה");
   }

  ngOnInit() {
    // localStorage.clear();

  }
  scrollToJobTable(){
    this.router.navigate(['home/job-table']);
    // window.onscroll()
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
  gotoJob() {
    window.scroll({ 
      top: 600, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  gotoTop() {
    window.scroll({ 
      top: 600, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
