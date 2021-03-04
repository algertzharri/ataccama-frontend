import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Job } from '../classes/job';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  jobId: any;
  job: Job[];
  locations: any = [];
  contact: any = {};
  contactForm: FormGroup;
  files: any[] = [];
  fileNumber: number = 0;
  filesArray: object[] = Array();
  submitted: boolean = false;

  constructor(
    private notification: NotificationService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.createForm();
    }
    createForm() {
      this.contactForm = this.fb.group({
         first_name: ['', Validators.required ],
         last_name: ['', Validators.required ],
         phone_number: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
         email: ['', [Validators.required, Validators.email ]],
         linkedin: [''],
         location: ['', Validators.required ],
         why_you: ['', Validators.required ]
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params.id;
    });

    this.getJob();

  }

  /* Get job details */
  getJob() {
    this.apiService.getSpecificJob(this.jobId).subscribe(
      (data:any) => {
        this.job = data;
        this.locations = data.location.split(',');
      }
    )
  }
  
  /* On form submit */
  onSubmit() { 
    this.createContact();
    this.submitted = true;
  }

  /* Create new contact */
  createContact() {
    this.contact = {...this.contact,...this.contactForm.value}
    this.contact.file = this.filesArray;

    this.apiService.addContact(this.contact, this.jobId).subscribe(
      (res)=>{ 
        this.notification.showSuccessMessage("Success", "Form submited successfully!");
      },
      (err) => { 
        this.notification.showErrorMessage("Error", "Some error ocurred!");
       }
    );
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.filesArray.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   */
  prepareFilesList(files: Array<any>) {
    let filesCount = files.length;
    // If more than 5 files uploaded at the same time show error 
    if (filesCount > 5) {
      return this.notification.showErrorMessage("Number of files", "You can upload max 5 files!");
    }
    for (const item of files) {
      let reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = () => {
        // If size bigger than 5MB show error
        if (item.size > 5000000) {
          return this.notification.showErrorMessage("File size", "Max file size is 5MB");
        }
        this.fileNumber++;
        // if limit of 5 files is reached, show error
        if (this.fileNumber > 5) {
          return this.notification.showErrorMessage("Number of files", "You can upload max 5 files!");
        }
        
        item.progress = 0;
        this.files.push(item);
        this.filesArray.push({
            "filename": item.name, 
            "filetype": item.type, 
            "value": (<string>reader.result).split(',')[1]
        });
        
      }
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
