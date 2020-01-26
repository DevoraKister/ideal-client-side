import { Pipe, PipeTransform } from '@angular/core';
import { Area } from "./shared/models/area";
import { City } from './shared/models/city';
import { JobService } from './shared/services/job.service';
@Pipe({
  name: 'cityPipe'
})
export class CityPipePipe implements PipeTransform {

  constructor(public jobService: JobService) {

  }
  public areas: Area[];

  transform(area: string, cities: City[]): any {
    this.jobService.getJobParameters().subscribe(state => {
      this.areas = state.Areas;
    });

    var id = this.areas.find(p => p.AreaName == area).AreaId;
    if (id == null)
      return null;

    this.jobService.getCity(id).subscribe(state => {
      return state});

    }
   
  }



