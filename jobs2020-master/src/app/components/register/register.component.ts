

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  AuthService } from '../../services/auth.service'; 
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  registerFormEntreprise: FormGroup;
  
  loading = false;
  submitted = false;
  incorrect =false;
  logo=null;
  skills = [];
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
   
) {
 
}
  ngOnInit(): void {

    
  this.registerForm = this.formBuilder.group({
    role:"developer",
    name: ['', Validators.required],
    skills: ['', Validators.required],
    category : ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  this.registerFormEntreprise = this.formBuilder.group({
    role:"company",
    name: ['', Validators.required],
    logo_company:['', Validators.required],
    logo:null,
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

}

get f() { return this.registerForm.controls; }
get fEntreprise() { return this.registerFormEntreprise.controls; }


onSubmit() {

  this.submitted = true;

  if (this.registerForm.invalid) {
      return;
  }




  this.loading = true;
  this.incorrect=false;


 
  this.authenticationService.createUser(this.registerForm.value).pipe(first()).subscribe(
    data => {
 
     
           
                if(data.message=='User registered successfully !'){

                      
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Compte créer avec succées',
                    showConfirmButton: false,
                    timer: 1500
                  })

                this.router.navigate(['/login']);
              

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

onSubmitEntreprise() {

  this.submitted = true;

  if (this.registerFormEntreprise.invalid) {
      return;
  }

  this.loading = true;
  this.incorrect=false;
  this.registerFormEntreprise.value.logo=this.logo;

  this.authenticationService.createUser(this.registerFormEntreprise.value).pipe(first()).subscribe(
    data => {
 
     
            if(data.message=='User registered successfully !'){

            
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Compte créer avec succées',
                showConfirmButton: false,
                timer: 1500
              })

             this.router.navigate(['/login']);
          
   
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


change_form(event){

  if(event.target.value=="developer"){
    document.getElementById("developer").style.display = "block";
    document.getElementById("company").style.display = "none";
  }else{
    document.getElementById("developer").style.display = "none";
    document.getElementById("company").style.display = "block";
  }

}

handleUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      this.logo=reader.result
    
  };
}


}