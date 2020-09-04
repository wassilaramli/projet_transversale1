import { Component, OnInit, Inject,PLATFORM_ID ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  JobService } from '../../services/job.service'
import Swal from 'sweetalert2' 
import {  AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-postjobform',
  templateUrl: './postjobform.component.html',
  styleUrls: ['./postjobform.component.css']
})
export class PostjobformComponent implements OnInit {

  postJobForm: FormGroup;
  loading = false;
  submitted = false;
  logo:any=null;
  job_type:String="";
  access_token:String=null
  job:any=null
  data:any=null

  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService:JobService,
    private authService:AuthService
) {

}



ngOnInit(): void {

  window.scroll(0,0);


 

  this.postJobForm = this.formBuilder.group({
    jobtitle:  ['', Validators.required],
    category:  ['', Validators.required],
    skills:  ['', Validators.required],
    job_type:  ['', Validators.required],
    condidate_region:['', Validators.required],
    price: ['', Validators.required],
    company_url: ['', Validators.required],
    description: ['', Validators.required],
    snippet: ['', Validators.required],
    company_id:this.authService.currentUserValue.id
  });
}





get f() { return this.postJobForm.controls; }

onSubmit() {

 
  this.submitted=true
  
  if (this.postJobForm.invalid) {
      return;
  }



  this.jobService.add(this.postJobForm.value)
      .pipe(first())
      .subscribe(
          data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Annonce publier avec succées',
              showConfirmButton: false,
              timer: 1500
            })
            this.loading = false;
            this.router.navigate(['/']); 
          },
          error => {
           
            this.loading = false;
          });
}







}
