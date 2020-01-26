import { Component, OnInit } from '@angular/core';
import { Statistics } from '../shared/models/Statistics';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public statistics:Statistics;
  constructor(public managerservice: ManagerService) { }

  ngOnInit() {
    this.managerservice.getknowledge().subscribe(state => {
      this.statistics = state;
     
    });
  }

}
