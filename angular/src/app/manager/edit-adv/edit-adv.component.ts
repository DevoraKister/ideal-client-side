import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Adv } from 'src/app/shared/models/adv';
import { MatSnackBar } from '@angular/material';
import { AdvService } from 'src/app/shared/services/adv.service';
// import { TopicQuestion } from 'src/app/shared/models/topicQuestion';

@Component({
  selector: 'app-edit-adv',
  templateUrl: './edit-adv.component.html',
  styleUrls: ['./edit-adv.component.css']
})
export class EditAdvComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  adv = new Adv();
  advsImg: Adv[];
  advsText: Adv[];

  constructor(public managerService: ManagerService, public router: Router, public formBuilder: FormBuilder
    , public _snackBar: MatSnackBar,public advService:AdvService) { }

  ngOnInit() {
    // this.managerService.getTopicQuestion().subscribe(res => {
    //   this.topics = res;
    // })
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.advService.getAdvs().subscribe(res=>{
      this.advsImg=res.filter(p=>p.AdvStatus==true);
      this.advsText=res.filter(p=>p.AdvStatus==false);
      })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    debugger
    this.adv.AdvStatus=false;
    this.managerService.addAdv(this.adv).subscribe(s => {
      // if (s)
        this._snackBar.open("הפרסומת נוספה בהצלחה","X",{duration:600});
      
      // else{
        // this._snackBar.open("תקלה, נסי מאוחר יותר","X",{duration:600});

      // }
    });
  }
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  addImgAdv(){
  let _formData = new FormData();
  // let name = this.currentUser.UserMail;
  // name += this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.'));;
  _formData.append("file", this.fileToUpload);
  this.managerService.sendFile(_formData).subscribe(res => {
    debugger
    // if (res.ReasonPhrase=="OK"){
      this._snackBar.open("הפרסומת נוספה בהצלחה","X",{duration:600});
    // }
    
    // else 
    // this._snackBar.open("תקלה, נסי מאוחר יותר","X",{duration:600});

   })


}


deleteAdv(advId){
  this.managerService.removeAdv(advId).subscribe(res=>{
this.advsText=res.filter(p=>p.AdvStatus==false);
this.advsImg=res.filter(p=>p.AdvStatus==true);
  })
}


}
