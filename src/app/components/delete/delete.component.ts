import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/booking/bookings.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  reservations;
  bookings;
  constructor(public bookingService :BookingsService,private titleService: Title) { }

  ngOnInit() {
    this.bookingService.getBookings().subscribe(bookings=>{
      this.bookings=bookings
      console.log(this.bookings);
    })
    this.titleService.setTitle( "Deleting from bookings's list " );
  }
  deleteBooking(booking_id){
    this.bookingService.deleteBooking(booking_id).subscribe(err=>{
      console.log('delete done')
    })
  }
}
