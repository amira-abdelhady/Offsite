import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminSrviceService } from "../services/admin-srvice.service";
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  isLoading=false;

  constructor(public adminServ :AdminSrviceService,private titleService: Title) { }
  onAdminLogin(form:NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    console.log(form.value.adminPhone); 
    this.adminServ.login(form.value.adminPhone, form.value.adminPassword);
  
  }

  onAdminReset(form:NgForm){
    if (form.invalid) {
      return;
    }
    console.log(form.value.adminPhone)

    this.adminServ.restAdmin(form.value.adminPhone)
  }
  ngOnInit() {
    this.titleService.setTitle( 'Login for football playground owners' );
    this.authStatusSub = this.adminServ.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
