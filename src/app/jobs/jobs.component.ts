import { Component, OnInit } from '@angular/core';
import { Job } from '../classes/job';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: Job[];

  constructor(
    private apiService: ApiService,
    private notification: NotificationService
  ) {}
   

  ngOnInit(){
    this.getJobList();
  }

  getJobList() {
    this.apiService.getJobs().subscribe(
      (data:any) => {
        this.jobs = data;
      },
      (err) => {
        this.notification.showErrorMessage("Jobs", "Some error ocurred getting jobs!");
      }
    );
  }

}
