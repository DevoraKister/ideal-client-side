import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-manager',
  templateUrl: './enter-manager.component.html',
  styleUrls: ['./enter-manager.component.css']
})
export class EnterManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem("manager","manager");
  
  }

}
