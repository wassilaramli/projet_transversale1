import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';
import Swal from 'sweetalert2' 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lead_magnet_form: FormGroup;
  loading_lead_magnet_form = false;
  submitted_lead_magnet_form = false;

  SkillsForm: FormGroup;
  submitted = false;
  all_jobs: any=null;
  loading =true;
  loading_array = [1, 2,3,4,5,6]
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService:JobService
    ) { 
      this.loading=true
    }

  ngOnInit(): void {

 

    this.loadAllJobs();



  }




private loadAllJobs() {
  this.jobService.all(null).pipe(first()).subscribe(res => {
    this.all_jobs = res;
    console.log( this.all_jobs)
    this.loading=false;
  });
}

ago(date){
  return moment(date).fromNow();
}

limit1(title){
  if(title.length>20) {
    return title.substr(0,20)+ '...'
  }else{
    return title
  }
}

limit(title){
  if(title.length>120) {
    return title.substr(0,120)+ '...'
  }else{
    return title
  }
}



}








