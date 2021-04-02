import { Component, OnInit } from '@angular/core';
import { playerSignup } from '../services/player/playerSginup.model';
import { PlayerService } from '../services/player/player.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register.component.html',
  styleUrls: ['./player-register.component.css']
})
export class PlayerRegisterComponent implements OnInit {

  constructor(private playerService:PlayerService,private route:Router,private titleService: Title) { }
  public playerModel=new playerSignup('','','','','')
  public err=2
  public Div;
  locations=['Qena','Cairo','Aswan','Banha','Asyut',
  'Beni Suef','Alexandria','Gizeh','Luxor','al-Mansura','Sohag','al-Minya','Ismailia','Tanta'];
  ngOnInit() {
    this.titleService.setTitle( 'Register for player' );
  }
  onSubmit(){
    console.log(this.playerModel)
    this.playerService.signupPlayer(this.playerModel).subscribe(
      response =>{
      this.playerService.registered=true
      this.route.navigate(['/player-login'])
    }
      ,
      error => {
        // console.log(error.error.Msg);
      this.err=1
      this.Div = error.error.Msg as string;}
      )

  }

}
