import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PlaygroundsService } from '../services/playgrounds.service'
import * as moment from 'moment'; 
import { BookingsService } from '../services/booking/bookings.service';
import { Booking } from './booking';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-playgrounds-details',
  templateUrl: './playgrounds-details.component.html',
  styleUrls: ['./playgrounds-details.component.css']
})
export class PlaygroundsDetailsComponent implements OnInit {
  playground;
  code;
  userSelectedAmHours;
  userSelectedPmHours;
  minDate=new Date();
  avalAm=[];
  avalPm=[];
  userSelectedDate;
  // userSelectedAmHours;
  // userSelectedPmHours;
  isLoading=false;
  bookingModel=new Booking('','','','')
  
  
  
  totalPriceOfBooking;
  numberOfbookings: Object;
  constructor(private playgroundServ:PlaygroundsService,
    private route:ActivatedRoute,private bookingsService:BookingsService,private titleService: Title) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.code=params.get('id');
      this.isLoading=true;
      // console.log(typeof(params.get("id")))
     });

     this.playgroundServ.getDetails(this.code).subscribe(data=>{
      this.isLoading=false; 
      this.playground=data ;
    this.titleService.setTitle( this.playground.name+' playground' );
      this.bookingsService.getBookingsNum(this.playground._id).subscribe(numberOfbookings=>{
        this.numberOfbookings=numberOfbookings
        console.log(this.numberOfbookings)
      })
    })
  }
  makeBooking(userSelectedDate,playground_id,AM,PM){
    this.bookingModel=new Booking(userSelectedDate,AM,PM,playground_id)
    // console.log(this.bookingModel);
    // console.log(this.userSelectedAmHours)
    this.bookingsService.makeBooking(this.bookingModel).subscribe(
      response =>{
        console.log(response)
      }
    )
    // this.calculatePrice(AM,PM)
  }
 /*  calculatePrice(AM,PM){
    let playgroundPrice_hour=parseInt(this.playground.price)*2
    if (AM.length===0){
      if(PM.length!==0){
        var numberOfPmHours= PM.length
        this.totalPriceOfBooking=playgroundPrice_hour*numberOfPmHours
        // console.log(this.totalPriceOfBooking+'..'+numberOfPmHours);
          }
        else{
          this.errDiv='Please select an hour at least'
        }
        }
        else if(AM.length>0 && PM.length>0){
          var numberOfAmHours= AM.length
          var numberOfPmHours= PM.length
          this.totalPriceOfBooking=playgroundPrice_hour*(numberOfPmHours+numberOfAmHours)
          // console.log(this.totalPriceOfBooking+'..'+numberOfPmHours);
        }
        else{
          var numberOfAmHours= AM.length
          this.totalPriceOfBooking=playgroundPrice_hour*numberOfAmHours
        // console.log(this.totalPriceOfBooking+'..'+numberOfAmHours);
      }
  }
 */
  valueChanged(event){
    this.isLoading=true;
     const momentDate=new Date(event.value)
     const formated=moment(momentDate).format('YYYY-MM-DD')
    this.userSelectedDate=formated
    //  console.log(formated)
    this.playgroundServ.getAvaliableHours(this.code,formated).subscribe(data=>{
      this.isLoading=false; 
      this.avalAm=data.avalAm;
      this.avalPm=data.avalPm; 
      // console.log(momentDate);
      // console.log(this.avalAm); 
      // console.log(typeof(this.avalPm))
 
    })

  }

}
