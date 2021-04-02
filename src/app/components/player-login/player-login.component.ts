import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player/player.service';
import { playerLogin } from '../services/player/playerLogin.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.css']
})
export class PlayerLoginComponent implements OnInit {

  constructor(private playerService: PlayerService,private route:Router,private titleService: Title) { }
  public isRegistered=false;
  public Div;
  public authDiv;
  public errDiv;
  public isErr=false
  public isErrAuth=false
  public playerModel=new playerLogin('','')
  ngOnInit() {
    this.titleService.setTitle( 'Login for player' );
    if (this.playerService.registered){
      console.log("asd")
      this.isRegistered = true
    this.Div= "Registerd Successfully, Please login to Continue"
    }
    if (this.playerService.authorized){
      this.isErrAuth = true
    this.authDiv= "Please Login To view this Page"
    }
  }

  public loginPlayer() {
    console.log(this.playerModel)
    this.playerService.loginPlayer(this.playerModel).subscribe(
      res=>
      {
        this.playerService.authorized=true
         console.log(res)
        localStorage.setItem('playerToken',res as string)
        this.route.navigate(['/'])
        this.playerService.setTimer()
    },
    error=>
    {
      this.isErr = true;
      this.errDiv=error.error.Msg
    }
    );
    } 

}
