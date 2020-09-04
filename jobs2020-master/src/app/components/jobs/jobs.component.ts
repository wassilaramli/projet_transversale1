import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { JobService } from '../../services/job.service'; 
import { first } from 'rxjs/operators';
import * as moment from 'moment';

import Swal from 'sweetalert2' 
import * as $ from 'jquery';
import {  AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  skills:null;  
  alertForm: FormGroup;
  FindForm: FormGroup;
  submitted = false;
  loading_alert_button :boolean=false;
  submitted_alert=false;

  all_jobs: any;
 
  sortby:String="date";
  date_range:String="all_time";
  experience:String="all_level";
  loading :boolean=true;
  no_data :boolean=false;
  loading_array = [1, 2,3]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private jobService: JobService,
    ) {}



  ngOnInit(): void {
    


    this.route.queryParams.subscribe(params => {
      
      if(params.skills){
        this.skills=params.skills;
      }else{
        this.skills=null
      }

      



      if(params.sortby){
        this.sortby=params.sortby;
      }else{
        this.sortby="date"
      }

      if(params.date_range){
        this.date_range=params.date_range;
      }else{
        this.date_range="all_time"
      }
      
      if(params.experience){
        this.experience=params.experience;
      }else{
        this.experience="all_level"
      }
      
      

      window.scroll(0,0);
      this.loadAllJobs();
     
    })

    this.FindForm = this.formBuilder.group({
      skills: [''],
    });

    this.alertForm = this.formBuilder.group({
      skills:this.skills
    });
  
  
  }

  private loadAllJobs() {
    this.loading =true;
    this.no_data=false;
    this.jobService.all(this.skills).pipe(first()).subscribe(res => {
      this.all_jobs = res;
        this.loading =false;
        if(this.authService.currentUserValue && this.authService.currentUserValue.role=="developer"){
          this.skills=this.f.skills.value
         
        this.jobService.find_and_update_history(this.skills)
        .pipe(first())
        .subscribe()
        }
        if(this.all_jobs.data.length==0)
          this.no_data=true;
    });
  }





  ago(date){
    return moment(date).fromNow();
  }

  limit(title){
    if(title.length>90) {
      return title.substr(0,90)+ '...'
    }else{
      return title
    }
  }


  change_sortby(event){
    this.sortby=event.target.value;
    this.router.navigate(['/jobs'], { queryParams: {  skills:this.f.skills.value,sortby:this.sortby,date_range:this.date_range,experience:this.experience }});
  }

  change_date_range(event){
    this.date_range=event.target.value;
    this.router.navigate(['/jobs'], { queryParams: {  skills:this.f.skills.value,sortby:this.sortby,date_range:this.date_range,experience:this.experience }});
  }

  change_experience(event){
    this.experience=event.target.value;
    this.router.navigate(['/jobs'], { queryParams: {  skills:this.f.skills.value,sortby:this.sortby,date_range:this.date_range,experience:this.experience} });
  }

  

  get f() { return this.FindForm.controls}
  get f2() { return this.alertForm.controls; }

  onSubmitFindForm() {
   
    this.submitted = true;

    if (this.FindForm.invalid) {
        return;
    }
   
    if(this.f.skills.value==""){
        this.skills=null;
    }else{
     
      
     

    }

    this.router.navigate(['/jobs'], { queryParams: {  skills:this.f.skills.value} });
  }


  onSubmitAlertForm() {

    this.submitted_alert = true;

    if (this.alertForm.invalid) {
        return;
    }
  
    this.loading_alert_button=true;
    this.alertForm.value.skills=this.skills
    if(this.authService.currentUserValue && this.authService.currentUserValue.role=="developer"){
    this.jobService.find_and_update_notif(this.skills)
        .pipe(first())
        .subscribe(
            data => {
   
              this.loading_alert_button=false;
              Swal.fire({
                title: '<strong>Succès ! </strong>',
                icon: 'success',
                html:
                  '<hr> Notification activée avec succès <hr> ',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Géniale!',
                confirmButtonAriaLabel: 'Géniale!',
              })
  
  
              
            },
            error => {
              this.loading_alert_button=false;
              
            });
  }else{
    this.router.navigate(['/login'])
  }

}


}
