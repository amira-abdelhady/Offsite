import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { AdminSrviceService } from "../services/admin-srvice.service";
import { PlayerService } from '../services/player/player.service';
import {nav} from '../../../assets/js/nav.js'
import * as $ from 'jquery'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public playerName;
  constructor(private authService:AdminSrviceService,private playerService:PlayerService) { 
    if(this.playerService.authorized){
    this.playerService.getPlayerName().subscribe(response=>{
    this.playerName=response as string
    // this.playerService.isLoginGetName=true
    })
    
  }

}

  ngOnInit() {  
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

      $(document).ready(function(){
        $('#dropdown').click(function(){
          $('#dropdown-menu').slideToggle("slow");
        });
        $('#dropdown2').click(function(){
          $('#dropdown-menu2').slideToggle("slow");
        })
        $(window).scroll(function(){
          var scroll = $(window).scrollTop();
          if (scroll > 100) {
            $(".editnav").css("background" , "#353a3b80");
            $('#dropdown-menu').css("background" , "#353a3b80");
            $('#dropdown-menu2').css("background" , "#353a3b80");
          }
          else{
            $(".editnav").css("background" , "rgba(255, 255, 255, 0)");
          }
      })
      })
  }

  onLogout(){
    this.authService.logout();

  }

   
  public playerLogOut(){
    localStorage.removeItem('playerToken')
    this.playerService.authorized = false;
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
