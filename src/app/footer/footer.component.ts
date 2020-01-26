import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  
  isBoss() {
    if (localStorage.getItem("isBoss"))
      this.router.navigate(['add-job']);
    else
      this.router.navigate(['register/register-boss']);
  }
  isScroll: boolean = false;
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition == 0) {
      this.isScroll = false;
    } else {
      this.isScroll = true;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
}

