import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/booking/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings;

  constructor(public bookingService :BookingsService) { }

  ngOnInit() {

    this.bookingService.getBookings().subscribe(bookings=>{
      console.log(bookings)
      this.bookings=bookings
      
    })
  }

}