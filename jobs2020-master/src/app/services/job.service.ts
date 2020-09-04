import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  public  basUrl:String;
  constructor(private http: HttpClient,private authService:AuthService, private router: Router) {
    this.basUrl='http://localhost:3000/jobs';
  }

  add(job: any) {
    return this.http.post<any>(this.basUrl+`/add`, job);
  }

  find(id:String) {
    return this.http.get(this.basUrl+`/find/${id}`);
  }

  find_and_update_history(keyword) {
    console.log(keyword)
      return this.http.put(this.basUrl+`/find_user_and_update_hist2/${this.authService.currentUserValue.id}`,{keyword:keyword});
  }

  find_and_update_notif(keyword) {
    return this.http.put(this.basUrl+`/find_user_and_update_notif/${this.authService.currentUserValue.id}`,{keyword:keyword});
  }

  all(keyword:any) {

    if(keyword!=null ){

  
      return this.http.get(this.basUrl+`/all?keyword=${keyword}`);

    }else if(this.authService.currentUserValue && this.authService.currentUserValue.role=="developer"){

    
     
        var profile=JSON.parse(this.authService.currentUserValue.profile)
        
        
        var skills = [];
        var category=profile.category;
        var history=profile.history;
        var notif=profile.notif;

        profile.skills.forEach(element =>{
          skills.push(element.value)
        });
        skills.push("null")

        var user_profile={
          skills:skills,
          category:category,
          history:history,
          notif:notif,
        }

        console.log(user_profile)

      
        
         return this.http.get(this.basUrl+`/all?user_profile=${JSON.stringify(user_profile)}`);
    }else{
 
      return this.http.get(this.basUrl+`/all`);
    }


 
    
  }

}
