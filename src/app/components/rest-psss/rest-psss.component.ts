import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminSrviceService } from "../services/admin-srvice.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rest-psss',
  templateUrl: './rest-psss.component.html',
  styleUrls: ['./rest-psss.component.css']
})
export class RestPsssComponent implements OnInit {

  constructor(public adminServ :AdminSrviceService) { }
  onAdminReset(form:NgForm){
    if (form.invalid) {
      return;
    }
    console.log(form.value.adminPhone)

    this.adminServ.restAdmin(form.value.adminPhone)
  }

  ngOnInit() {
  }

}
