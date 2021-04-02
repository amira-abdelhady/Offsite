import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerAuthenticationGuard implements CanActivate {
  constructor(private playerService:PlayerService,private route:Router){}
  canActivate() {
    
    if(this.playerService.auth())
    return true;
    else{
      this.route.navigate(['login'])
      return false
  }
}
}
