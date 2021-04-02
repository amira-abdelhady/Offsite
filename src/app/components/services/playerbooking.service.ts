import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerbookingService {

  constructor(private http:HttpClient) { }

  getplayerBookings(){
    return this.http.get('http://localhost:3000/player/listplayerbookings',{
    observe :'body',   
    params : new HttpParams().append('playerToken',localStorage.getItem('playerToken'))})

  }
remove(id){
return this.http.get('http://localhost:3000/player/remove/'+id,{
    observe :'body',   
    params : new HttpParams().append('playerToken',localStorage.getItem('playerToken'))})

}
}
