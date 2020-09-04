import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../../services/auth.service'; 
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  role:string = "null";
  name:string = "null";
  constructor(    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {

      if (this.authenticationService.currentUserValue) { 
    if(this.authenticationService.currentUserValue.role=="company"){
     this.role="company"
     this.name=this.authenticationService.currentUserValue.name
    }else  if(this.authenticationService.currentUserValue.role=="developer"){
      this.role="developer"
      this.name=this.authenticationService.currentUserValue.name
    }
 
  }

   }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout();
    window.location.reload()
  }
}
