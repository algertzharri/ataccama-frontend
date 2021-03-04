import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Job } from '../../classes/job';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-job-content',
  templateUrl: './job-content.component.html',
  styleUrls: ['./job-content.component.scss']
})
export class JobContentComponent implements OnInit {

  jobId: any;
  job: Job[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params.id;
    });

    this.getJob();
  }

  getJob() {
    this.apiService.getSpecificJob(this.jobId).subscribe(
      (data:any) => {
        this.job = data;
      },
      (err) => {
        this.notification.showErrorMessage("Job", "The requested job doesn't exist!");
      }
    )
  }

  convertToHTML(){
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.job['content'], 'text/html');
    return doc.body;
  }

}
