import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { JobParameters } from 'src/app/shared/models/JobParameters';
import { UserService } from 'src/app/shared/services';
import { JobService } from 'src/app/shared/services/job.service';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  currentUser: User = new User();
  details: boolean;
  public jobParameters: JobParameters = new JobParameters();
  iduser: any;
  constructor(public userService: UserService, public jobService: JobService, public route: ActivatedRoute) {
  }
  ngOnInit() {
    this.iduser = this.jobService.userId;
    // this.route.snapshot.params["userid"];
    this.userService.getById(this.iduser).subscribe(res => {
      this.currentUser = res;
      this.jobService.getJobParameters().subscribe(s => {
        this.jobParameters = s;
      });
    });

  }
  updateDetails() {

    this.userService.updateUser(this.currentUser).subscribe(res => {
      this.userService.user = res;
      Swal.fire({
        title: 'הפרטים עודכנו בהצלחה!',
        // text: this.name,
        type: 'success',
        confirmButtonText: 'המשך'
      })
    })
    this.details = false;
  }

}
