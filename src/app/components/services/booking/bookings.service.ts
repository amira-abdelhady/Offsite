import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http:HttpClient) { }

  public makeBooking(bookingInfo){
    console.log(bookingInfo)
    return this.http.post('http://localhost:3000/bookings/book',bookingInfo,{
      observe :'body',   
      params : new HttpParams().append('playerToken',localStorage.getItem('playerToken'))
      });
  }
  public deleteBooking(bookingId){
    return this.http.get('http://localhost:3000/bookings/deleteBooking/'+bookingId)
  }
  public getBookings(){
    return this.http.get('http://localhost:3000/bookings/listbooking')
  }
  public getBookingsNum(playgrundId){
    return this.http.get('http://localhost:3000/bookings/badge/'+playgrundId)
  }
}
