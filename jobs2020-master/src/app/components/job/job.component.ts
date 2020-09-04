import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import {  AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {



  job:any;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private authService:AuthService
    ) { 
    
    }



  ngOnInit(): void {

    $(window).scroll(function() {    
        $(".navbar-default").removeClass("sticky");
    });
    

 
    this.route.queryParams.subscribe(params => {
    
      this.loadJob(this.route.snapshot.paramMap.get('id'))
     
      window.scroll(0,0);
    }) 

  

  
  }

  private loadJob(id:String) {
   
    this.jobService.find(id).pipe(first()).subscribe(res => {
      this.job = res;
    });
  }

  randomNumber(){
    return new Date().getTime().toString();
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

  
  ago(date){
    return moment(date).fromNow();
  }


  postuler(){
    if(this.authService.currentUserValue && this.authService.currentUserValue.role=="developer" ){
      location.replace(this.job.company_url);
      }else{
        this.router.navigate(['/login'])
      }
  }
  


}