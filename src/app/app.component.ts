import { Component, OnInit } from '@angular/core';
import { AdminSrviceService } from './components/services/admin-srvice.service'
import { Title } from '@angular/platform-browser';
import { PlayerService } from './components/services/player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'gradutationProject';

  constructor(private authService: AdminSrviceService,private titleService: Title,private playerService:PlayerService){

  }

  ngOnInit(){
    this.titleService.setTitle( 'Offsite ' );
    this.authService.autoAuthUser();
    if(this.playerService.auth()){
      this.playerService.authorized=true
    }else{
      this.playerService.authorized=false
    }
    
  } 
    
}
