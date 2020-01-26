import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/models/question';
import { UserService } from '../shared/services';
import { ForumService } from '../shared/services/forum.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TopicQuestion } from '../shared/models/topicQuestion';
import { Title } from '@angular/platform-browser';
import { LoginUserComponent } from '../login/login-user/login-user.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  qustionTopic: TopicQuestion[];
  currentQuestion: Question = new Question();
  questionsList: Question[];
  tempList: Question[];
  constructor(public userService: UserService, public forumService: ForumService,public titleService:Title
    , public snakbar: MatSnackBar,public dialog:MatDialog) {
    this.titleService.setTitle("פורום הלכתי  ");

     }

  ngOnInit() {
    this.forumService.getForum().subscribe(res => {
      this.questionsList = res.filter(p=>p.Answer!=null);
      this.tempList=this.questionsList;
      this.forumService.questionTopic().subscribe(res => {
        this.qustionTopic = res;
      })
    })
  
  }
  askQuation(qu, top) {
    if(!localStorage.getItem("UserId")){
      const dialogRef = this.dialog.open(LoginUserComponent, {
        width: '50vw',
        // height: '80vh',
      });
      dialogRef.afterClosed().subscribe(result => { });
    }
    else{
    debugger
    // this.currentQuestion.Answer = an;
    this.currentQuestion.Question1 = qu.value;
    this.currentQuestion.QueTopicId = top.value;
    this.currentQuestion.QueUserId = parseInt(localStorage.getItem("UserId"));
    this.forumService.askQuetion(this.currentQuestion).subscribe(res => {
      if (res) {
        this.snakbar.open("תודה על השאלה, נשיב לך בהקדם ", "x", { duration: 6000 })
        this.currentQuestion=new Question();
      }
    })
  }
}
  searchByTopic(topicId){

this.tempList=this.questionsList.filter(o=>o.QueTopicId==topicId);
  }
}









