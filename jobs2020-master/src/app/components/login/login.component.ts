

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  incorrect =false

 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
   
) {
 /* if (this.authenticationService.currentUserValue) { 
    if(this.authenticationService.currentUserValue.role=="Startup"){
      this.router.navigate(['/startup/postjob']);
    }else  if(this.authenticationService.currentUserValue.role=="Developer"){
      this.router.navigate(['/developer/resume']);
    }
   
  }*/
}
  ngOnInit(): void {

  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

}

get f() { return this.loginForm.controls; }

onSubmit() {

  this.submitted = true;

  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.incorrect=false;
  
  this.authenticationService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
    data => {
 
     

            if(data.role){

             if(data.role=="developer"){
              
                this.router.navigate(['/']);
              }else if(data.role=="company"){
                
               this.router.navigate(['/']);
              }

         
          
   
            }else{
         
              this.loading = false;
              this.incorrect=true;
            }
              
          },
          error => {
          
              this.incorrect=true;
              this.loading = false;
          });
}

}