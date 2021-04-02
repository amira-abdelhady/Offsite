const express = require("express");
const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken"); 
const Player = require("../models/player");
const Bookings = require("../models/booking");
const Playground = require("../models/playground");
const checkAuth=require('../middleware/check'); 
const router = express.Router();


var Token = ''
function verifyToken(req,res,next){
 
  let playerToken=req.query.playerToken
  jwt.verify(playerToken,'Shhhh',(err , verifytoken)=>{
    if (err)
    return res.status(400).json({message : 'You have to login first ... You are unauthorized'})
    if (verifytoken){
        Token = verifytoken;
      next();
    }
    }
)}


router.get('/book/:id',(req,res)=>
{
Bookings.findOne({_id:req.params.id}).then((data)=>{
    res.status(200).json(data) ;
    
}).catch(error=>{
    res.status(500).json({
      message:'Sorry, somthing went wrong!!'
    })
  }) 
})

/////list all bookings for one admin
router.get("/listbooking",checkAuth, (req, res, next)=>{ 
    // console.log(req.adminData.adminId)
    Playground.findOne({ownerId:req.adminData.adminId}).then(playground => {
    //   console.log(playground);
      Bookings.find({playgroundId:playground._id}).populate({path:'playerId',select:'name phone -_id'})
      .populate({path:'playgroundId', select:'name -_id'}).then((data)=>{
          console.log(data);
        res.status(200).json(data) ; 
    })

    }).catch(error=>{
        res.status(500).json({
          message:'Sorry, somthing went wrong!!'
        })
      });
 });

 
router.get('/deleteBooking/:id',checkAuth, ( req, res) => {
    let bookingToBeDeletedId=req.params.id
    // let player_Id=booking.playerId
    // let playerCart=cart.bookingIds;
    
    Bookings.findOneAndDelete({_id:bookingToBeDeletedId}).then(booking=>{
        let player_Id=booking.playerId
        var indexOfBookingIdInCart=-1;
        Player.findOne({_id:player_Id},(err,playerBooked)=>{
            // console.log(playerBooked)
            for (let i=0; i<playerBooked.cart.bookingIds.length; i++){
                if(req.params.id===playerBooked.cart.bookingIds[i].toString()){
                    indexOfBookingIdInCart=i;
                    console.log("found the booking id in player's cart has booked");
                    break;
                }
                }
            if(indexOfBookingIdInCart>=0){
                var bookingDeleted=playerBooked.cart.bookingIds[indexOfBookingIdInCart].toString()
                console.log(bookingDeleted+' delete this booking from player cart of index '+indexOfBookingIdInCart)
                console.log(playerBooked.cart.totalPrice)
                playerBooked.cart.totalPrice-=booking.totalPrice
                console.log(playerBooked.cart.totalPrice)
                playerBooked.cart.bookingIds.pull(bookingDeleted)
                Player.updateOne({_id : player_Id},{$set:playerBooked},err=>{if(err)console.log(err)});
            }
        
        })
           res.json('deleting this booking is completed')
    }).catch(error=>{
        res.status(500).json({
          message:'Sorry, somthing went wrong!!'
        })
      })
})


router.get('/check',verifyToken,( req, res) => { 
    const date=req.query.date
    const playgroundId=req.query.playgroundId;
    console.log(date) 
    console.log(typeof(req.query.date))   
    console.log(playgroundId)
    if(!date){
        res.status(501).json({message: 'Please select a date first'});
    }
    else{
        id=mongoose.Types.ObjectId(playgroundId)
    var playgroundAm=[];
    const playgroundPm=[];
    const bookingAm=[]; 
    const bookingPm=[]; 
    let pmRes=[];
    let amRes=[]; 
    var newarr=[];
    var newarr2=[];
    var newarr3=[];
    var newarr4=[]; 
    var pp=[];  
    Bookings.find({bookingDate:date,playgroundId: playgroundId}).then(bookinData=>{
     
        bookinData.map(b=>{
          bookingAm.push(b.bookingAmHours);
          bookingPm.push(b.bookingPmHours); 
        }) 
        console.log('bookingAm is '+bookingAm)
        console.log('bookingBm is '+bookingPm) 
         console.log('/////////////////////')    
        newarr=Array.prototype.concat.apply([],bookingAm)
        newarr3=Array.prototype.concat.apply([],bookingPm)
        console.log('newarr is '+newarr)
        console.log('newarr3 is '+newarr3)
        console.log('/////////////////////')

        Playground.find({_id: id}).then(playground=>{
            playground.map(fixesHours=>{
              playgroundAm.push(fixesHours.amHours);
              playgroundPm.push(fixesHours.pmHours);
  

        newarr2=Array.prototype.concat.apply([],playgroundAm)
        newarr4=Array.prototype.concat.apply([],playgroundPm)
 


             amRes=newarr2.filter(x=>!newarr.includes(x));
             pmRes=newarr4.filter(x=>!newarr3.includes(x));  

           
             res.json({
               avalAm:amRes,
               avalPm:pmRes
              });  

            }) 
        })
 
    })
    }
    
  
 })


/*  if(!amRes){
    res.json({message:'Sorry there is no am hours available'})   
   }
   if(!pmRes){
    res.json({message:'Sorry there is no pm hours available'})
   }
   if(!amRes || !pmRes) {
    res.json({message:'Sorry seems like there is no hour available on this day try anther one'})
   } */
   
 router.post('/book',verifyToken, ( req, res) => {
    const player_Id =Token.playerId;
    const {  selectedDate ,selectedHoursAM,selectedHoursPM  ,playgroundId }= req.body
    let timeNow=new Date()
    const nubmerOfHoursInPeriod=2
    var new_booking= new Bookings({
    reservationDate:timeNow.toLocaleString(),
    bookingDate:selectedDate,
    playgroundId:playgroundId,
    playerId:player_Id,
    totalPrice:0,
    bookingPmHours:selectedHoursPM,
    bookingAmHours:selectedHoursAM
    })
    console.log('/////////////'+new_booking)
    Playground.findOne({_id:playgroundId}).then((playground)=>{
        playgoundPrice_Hour=playground.price
         new_booking.totalPrice = playgoundPrice_Hour*nubmerOfHoursInPeriod
         if(!selectedHoursAM){
            if(!selectedHoursPM){
                res.status(501).json({message: 'Please select an hour at least'}) ;
            }else{
                numberOfHoursSelected=new_booking.bookingPmHours.length
                console.log(numberOfHoursSelected);
                new_booking.totalPrice*=numberOfHoursSelected
            }
         }else if(selectedHoursAM && selectedHoursPM){
            numberOfHoursSelected=new_booking.bookingPmHours.length + new_booking.bookingAmHours.length
            console.log(numberOfHoursSelected);
            new_booking.totalPrice*=numberOfHoursSelected

        }
        else{
            numberOfHoursSelected=new_booking.bookingAmHours.length
            console.log(numberOfHoursSelected);
            new_booking.totalPrice*=numberOfHoursSelected
        }
        new_booking.save().then( booking=> {
            res.status(201).json(booking);
            console.log('*********'+booking)
                Player.findOne({_id:booking.playerId},(err,player)=>{
                    console.log(player)
                    if(player.cart.bookingIds.length==0){
                        player.cart.bookingIds=[booking._id]
                        player.cart.totalPrice=booking.totalPrice
                        console.log(player)
                        Player.updateOne({_id : player._id},{$set:player},err=>{if(err)console.log(err)});
                        }
                    else{ console.log(player)
                        player.cart.totalPrice+=booking.totalPrice
                        player.cart.bookingIds.push(booking._id)
                        console.log(player)
                        Player.updateOne({_id : player._id},{$set:player},err=>{if(err)console.log(err)});
                    }
                    
                })
        }).catch(err=>{
            res.status(501).json({message: 'Sorry , somting went wrong!!'});
        })  
    })
 })


 router.get('/badge/:id',( req, res) => {
    let monthNow=1+(new Date().getMonth())
    Bookings.find({playgroundId:req.params.id}).then(bookings => {
        var BookingsThisMonth=bookings.filter(booking=>{
            return (booking.reservationDate.includes(monthNow+"/") || booking.reservationDate.includes(monthNow+"-"))
        })
        console.log(monthNow+'...'+BookingsThisMonth.length)
        res.json(BookingsThisMonth.length)
    })
 })
 


module.exports = router;