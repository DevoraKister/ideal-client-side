import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../shared/services';
import { JobService } from '../shared/services/job.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sign-to-job',
  templateUrl: './sign-to-job.component.html',
  styleUrls: ['./sign-to-job.component.css']
})
export class SignToJobComponent implements OnInit {
  currentUser: User = new User();
  cv: string;
  details: boolean;
  idJob: number;
  constructor(public router: Router, public userService: UserService,
    public jobService: JobService, public route: ActivatedRoute,public dialog:MatDialog) { }

  ngOnInit() {
    this.details = true;
    // if (this.userService.user != null)
    // this.currentUser = this.userService.user;
    if (localStorage.getItem("token")){
      this.currentUser = this.userService.user;
      if(!this.currentUser.UserMail){
        this.currentUser.UserMail=localStorage.getItem("UserMail");
        this.currentUser.password=localStorage.getItem("token");
        this.userService.login(this.currentUser).subscribe(p=>{
          this.currentUser=p;
        })
      }
    }
    this.userService.getCV(this.currentUser.UserId).subscribe(state => {
      debugger;
      this.cv = "http://localhost:53790/UploadFile/" + state;
      // this.userService.downloadPDF(this.cv).subscribe(res => {
      //   const fileURL = URL.createObjectURL(res);
      //   window.open(fileURL, '_blank');

      // });
    })
    this.idJob = this.route.snapshot.params["id"];
  }
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  updateDetails() {
    this.currentUser.UserIsSmartAgent = true;

    this.userService.updateUser(this.currentUser).subscribe(res => {
      this.userService.user = res;
      Swal.fire({
        title: 'הפרטים עודכנו בהצלחה!',
        type: 'success',
        confirmButtonText: 'המשך'
      })

    })
    this.details = false;
  }
  SignToJob() {
    this.userService.updateUser(this.currentUser).subscribe(res => {
      this.dialog.closeAll();
      let _formData = new FormData();
      let name = this.currentUser.UserMail;
      name += this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.'));;
      _formData.append("file", this.fileToUpload, name);
      this.userService.sendFile(_formData).subscribe(res => { })
      //  console.log(this.fileToUpload);
      this.userService.registerToJob(this.idJob, this.currentUser.UserId).subscribe(state => {
      })
    });
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }




}

