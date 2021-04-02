import { Component, OnInit } from '@angular/core';
import { AdminSrviceService } from '../services/admin-srvice.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  playground;
  isLoading = false;

  constructor(private authService:AdminSrviceService,private titleService: Title) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.showOwnerPlayground().subscribe(data=>{
    this.isLoading=false;
    this.playground=data 
    console.log(this.playground);
   console.log(typeof(this.playground))
   this.titleService.setTitle( 'Edting the Playground' );
})
    
  }

}
