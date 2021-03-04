import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../classes/job';
import { Contact } from '../classes/contact';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  jobListUrl: string = environment.apiUrl + "/jobs";
  jobUrl: string = environment.apiUrl + "/job/";
  
  constructor(private httpClient: HttpClient) {}

  getJobs()
  {
    return this.httpClient.get(this.jobListUrl).pipe(
      map((data: Job[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }

  getSpecificJob(id: number)
  {
    return this.httpClient.get(this.jobListUrl + '/' + id).pipe(
      map((data: Job[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }

  addContact(contact: Contact[], jobId: number)
  {
    return this.httpClient.post(this.jobUrl + jobId + '/contact', contact).pipe(
      map((data:any) => {
          return data;
      }), 
      catchError( error => {
        return throwError('Something went wrong: ' + error);
      })
    )
  }
  
}
