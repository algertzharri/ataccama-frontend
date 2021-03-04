import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../app.component';
import { JobsComponent } from '../jobs/jobs.component';
import { ContactComponent } from '../contact/contact.component';
import { JobContentComponent } from '../jobs/job-content/job-content.component';
import { ProgressComponent } from '../contact/progress/progress.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../modules/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SimpleNotificationsModule } from 'angular2-notifications';

const routes: Routes = [
    { path: '', component: JobsComponent },
    { path: 'job/:id', component: JobContentComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    ContactComponent,
    JobContentComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot({position:['bottom', 'right']})
  ],
  providers: [
    { 
      provide: 
        MAT_FORM_FIELD_DEFAULT_OPTIONS, 
        useValue: { 
          appearance: 'fill' 
        }
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
