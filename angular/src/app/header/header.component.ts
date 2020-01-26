import { Component, OnInit, HostListener } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../shared/services';
import { MatDialog } from '@angular/material';
import { LoginBossComponent } from '../login/login-boss/login-boss.component';
import { LoginUserComponent } from '../login/login-user/login-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  public name;

  hi: boolean = false;
  list: number[] = [1, 2, 3];
  currentJob: number = 26;
  constructor(public userService: UserService, public router: Router,public dialog:MatDialog) { }

  ngOnInit() {
    //  this.currentUser=await
    // this.isUser=this.userService.isUser;
    if (this.userService.boss.BossName || this.userService.user.UserName)
      this.hi = true;
    // if(this.userService.user.UserName)
    // this.hi=false;
  }



  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
  }

  isBoss() {
    if (localStorage.getItem("isBoss"))
      this.router.navigate(['add-job']);
    else
    {
    const dialogRef = this.dialog.open(LoginBossComponent, {
      height: '65vh',
      width:'40vw'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
  
  isUser() {


  }
area(){
  if(!localStorage.getItem("token")){
  const dialogRef = this.dialog.open(LoginUserComponent, {
    height: '65vh',
    width:'40vw'
  });
  dialogRef.afterClosed().subscribe(result => {
  });
}
else
  this.router.navigate(['/personal-area']);
  
}
  trunOff(){
    this.userService.boss=null;
    this.userService.user=null;
    localStorage.clear();
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
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
}

