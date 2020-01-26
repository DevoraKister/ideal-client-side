import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { Router } from '@angular/router';
import { TopicQuestion } from 'src/app/shared/models/topicQuestion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForumComponent } from 'src/app/forum/forum.component';
import { ForumService } from 'src/app/shared/services/forum.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-answer-from-rav',
  templateUrl: './answer-from-rav.component.html',
  styleUrls: ['./answer-from-rav.component.css']
})
export class AnswerFromRavComponent implements OnInit {
  currentQuestion: Question = new Question();
  topics: TopicQuestion[];
  questionList: Question[];
  registerForm: FormGroup;
  question:Question=new Question()
  submitted = false;
  constructor(public managerService: ManagerService, public furomService: ForumService,
    public router: Router, public formBuilder: FormBuilder,public dialog:MatDialog,
    public forumComponent: ForumComponent) { }

  ngOnInit() {
    this.managerService.getTopicQuestion().subscribe(res => {
      this.topics = res;
    })
    this.registerForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', [Validators.required]],
      topic: ['', [Validators.required]],
    });
    this.furomService.getForum().subscribe(res => {
      this.questionList = res.filter(p => p.Answer == null);
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // this.currentQuestion.Question1=this.registerForm.controls["question"].value;
    // this.currentQuestion.Answer=this.registerForm.controls["answer"].value;
    this.currentQuestion.QueTopicId = this.registerForm.controls["topic"].value;
    this.managerService.addQuestionfromRav(this.currentQuestion).subscribe(res => {
      this.forumComponent.questionsList = res;
    })
  }
  addAnswer(id, answer) {
    this.question.QueId=id;
    this.question.Answer=answer;
    this.furomService.addAnswer(this.question).subscribe(res => {
      if (res)
        this.furomService.getForum().subscribe(res => {
          this.questionList = res.filter(p => p.Answer == null);
        })
    })
  }
  deleteQuestion(id){
    // let dialogRef = this.dialog.open()
    this.managerService.deleteQuestion(id).subscribe(res=>{
      if (res)
      this.furomService.getForum().subscribe(res => {
        this.questionList = res.filter(p => p.Answer == null);
      })
    })
  }
}