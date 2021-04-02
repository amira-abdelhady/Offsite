import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminSrviceService } from "../services/admin-srvice.service";
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit, OnDestroy {
private authStatusSub: Subscription; 
isLoading=false;



  constructor(public adminServ :AdminSrviceService,private titleService: Title) { }

  onAdminSignup(form:NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    console.log(form.value.adminPhone) 
    this.adminServ.createAdmin(form.value.adminPhone, form.value.adminPassword);
 
  }

  ngOnInit() {
    this.titleService.setTitle( 'Register as football playground owner' );
    this.authStatusSub = this.adminServ.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
