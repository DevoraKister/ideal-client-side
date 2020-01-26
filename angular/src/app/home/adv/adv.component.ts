import { Component, OnInit } from '@angular/core';
import { Adv } from 'src/app/shared/models/adv';
import { AdvService } from 'src/app/shared/services/adv.service';

@Component({
  selector: 'app-adv',
  templateUrl: './adv.component.html',
  styleUrls: ['./adv.component.css']
})
export class AdvComponent implements OnInit {

  constructor(public advService:AdvService) { }
  advs: Adv[];
  ngOnInit() {
   this.advService.getAdvs().subscribe(res=>{
    this.advs=res.filter(p=>p.AdvStatus==false);
    })
  }

}
