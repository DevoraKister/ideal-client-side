import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/services/manager.service';
import { Router } from '@angular/router';
import { Statistics } from 'src/app/shared/models/statistics';

@Component({
  selector: 'app-get-statistics',
  templateUrl: './get-statistics.component.html',
  styleUrls: ['./get-statistics.component.css']
})
export class GetStatisticsComponent implements OnInit {
  statistics:Statistics;
   constructor(public managerService:ManagerService) { }
 
   ngOnInit() {
     this.managerService.getknowledge().subscribe(s => {
       this.statistics = s;
     }
     
 
     )
     
  
   }
   
 
 }