import { Component, OnInit } from '@angular/core';
import { PlayerbookingService } from '../services/playerbooking.service'
@Component({
  selector: 'app-removeplayerbooking',
  templateUrl: './removeplayerbooking.component.html',
  styleUrls: ['./removeplayerbooking.component.css']
})
export class RemoveplayerbookingComponent implements OnInit {
bookings;
  constructor(public playerbook:PlayerbookingService) { }

  ngOnInit() {

    this.playerbook.getplayerBookings().subscribe(bookings=>{
      this.bookings=bookings
      console.log(this.bookings);
      
    })


  }
  removebookings(bookingId){

this.playerbook.remove(bookingId).subscribe(b=>{

  console.log(b)
})


  }

}
