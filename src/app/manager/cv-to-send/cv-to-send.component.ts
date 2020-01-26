import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SignToJobManagerComponent } from '../sign-to-job-manager/sign-to-job-manager.component';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-cv-to-send',
  templateUrl: './cv-to-send.component.html',
  styleUrls: ['./cv-to-send.component.css']
})
export class CvToSendComponent implements OnInit {

  constructor(public managerService: ManagerService,public userService: UserService,
     public _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    // this.userService.getCV(this.currentUser.UserId).subscribe(state => {
    //   debugger;
    //   this.cv = "http://localhost:53790/UploadFile/" + state;
     
    // })
    debugger;
  }
  sendCv(userId) {
    this.managerService.sendCv(userId).subscribe(res => {
      if (res) {
        this._snackBar.open('קורות החיים נשלחו בהצלחה', 'X', { duration: 6000 });
        this.managerService.signedUser = this.managerService.signedUser.filter(p => p.UserId != userId);
      }
      else
        this._snackBar.open('תקלה במערכת. נסי שוב מאוחר יותר', 'X', { duration: 6000 });
    })
    if (this.managerService.signedUser.length == 0) this.afterSendAllCv();

  }
  sendAllCv() {
    debugger;
    for (let index = 0; index < this.managerService.signedUser.length; index++) {
      this.managerService.sendCv(this.managerService.signedUser[index].UserId).subscribe(res => {
        debugger
        if (res) {
          // this.sign.jobSign=res;
          debugger
          this.managerService.signedUser = this.managerService.signedUser.filter(p => p.UserId != this.managerService.signedUser[index].UserId);
          if(this.managerService.signedUser.length==0){
            this.afterSendAllCv();
          }
        }
      });
    }

  }
  afterSendAllCv(){
    this.dialog.closeAll();
    this._snackBar.open('קורות החיים נשלחו בהצלחה', 'X', { duration: 6000 });
    this.managerService.listSignedJob().subscribe(res => {
      debugger
      this.managerService.jobSign = res;
    })
  }
  
}
