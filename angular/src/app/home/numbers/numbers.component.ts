
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AdvService } from 'src/app/shared/services/adv.service';
import { Adv } from 'src/app/shared/models/adv';

@Component({
  // animations: [
  //   trigger('changeDivSize', [
  //     state('initial', style({
  //       // backgroundColor: 'green',
  //       width: '100px',
  //       height: '100px',
  //       content: "111"
  //     })),
  //     state('final', style({
  //       // backgroundColor: 'red',
  //       width: '200px',
  //       height: '200px',
  //       content: "222"
  //     })),
  //     transition('initial=>final', animate('1500ms')),
  //     transition('final=>initial', animate('1000ms'))
  //   ]),
  // ]
  // ,
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  constructor(public advService:AdvService) { }
  advs: Adv[];
  ngOnInit() {
    this.advService.getAdvs().subscribe(res=>{
      this.advs=res.filter(p=>p.AdvStatus==true);
      })
  }
  currentState = 'initial';
 public s1: boolean ;
 public  s2: boolean;
 public s3: boolean;
 public s4: boolean;
 public s5: boolean;
  changeState() {
    // this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  st1() {
    this.s1 = this.s2 = this.s3 = this.s4 = this.s5 = false;
    this.s1=true;
  }
  st2() {
    this.s1 = this.s2 = this.s3 = this.s4 = this.s5 = false;
    this.s2=true;
  } 
   st3() {
    this.s1 = this.s2 = this.s3 = this.s4 = this.s5 = false;
    this.s3=true;
  } 
   st4() {
    this.s1 = this.s2 = this.s3 = this.s4 = this.s5 = false;
    this.s4=true;
  } 
   st5() {
    this.s1 = this.s2 = this.s3 = this.s4 = this.s5 = false;
    this.s5=true;
  }
}

