import { Injectable , Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { PlayerService } from '../../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerTokenInterceptorService implements HttpInterceptor {

  constructor( private injector:Injector) { }

  intercept(req, next){
    let tokenValue =this.injector.get(PlayerService).getToken()
    let tokenReq=req.clone({
      setParams:{
        playerToken: 'player_token '+tokenValue
      }
    })
    return next.handle(tokenReq)
  }
}
