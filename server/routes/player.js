const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Bookings = require("../models/booking");
const Player = require("../models/player");
const router = express.Router();
  
router.post("/signup", (req, res, next) => {
    const {playerName,playerPhone, location ,password , repeatPassword}= req.body
    if (!playerName || !playerPhone || !password || !location || !repeatPassword) {
        res.status(501).json({message: 'Please enter all fields'}) ;
        }
    else if (password != repeatPassword) {
      res.status(501).json({message: "Passwords doesn't match"}) ;
    }
    else{
        Player.findOne({ phone: playerPhone }).then(player => {
            if (player) {
                res.status(501).json({message: "This phone is already exists! try anther one"});
                } 
            else {
                Player.findOne({ name: playerName }).then(player => {
                    if (player) {
                        res.status(501).json({message: "This name is already exists! try anther one"});
                        } 
                    else{
                        bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(req.body.password, salt,(err,hashedPassword) => {
                        const newPlayer = new Player({
                            name:playerName,
                            phone:playerPhone,
                            location: location,
                            password: hashedPassword
                        });
                        newPlayer.save().then( result => {
                        console.log(result);
                        res.status(201).json(result);
                        }).catch(err => {
                          res.status(500).json({
                            message: 'Phone Number Already Exist'
                          });
                        })
                    })
                    });
                    }   
                })
                
            }})
        } 
});

router.post("/login", (req, res, next) => {  
  // console.log(req.body.playerPhone); 
  let fetchedPlayer ;
  Player.findOne({ phone: req.body.playerPhone }).then(player => {
      if (!player) {
        return res.status(401).json({message:'this phone number is not found if you have not registered yet got to sign up down there'});
      }
      // console.log(player);
      fetchedPlayer = player;
      return bcrypt.compare(req.body.password, player.password)})
      .then( isMatch => {
        if (!isMatch) {
          return res.status(401).json({message: "password doesn't match"});
        }

          let playerToken = jwt.sign({player_name : fetchedPlayer.name ,playerId: fetchedPlayer._id} ,'Shhhh',{expiresIn:'24h'})
          // console.log(fetchedUser);
          res.status(200).json(playerToken);
        }).catch(err => {
          return res.status(401).json({
            message: "Invalid Phone or Password"
          });
        });
})


var Token = ''
function verifyToken(req,res,next){
  // console.log(req.query.playerToken);
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

router.get('/name',verifyToken ,(req,res,next)=>{
  // console.log(req);
  if(req.query.playerToken != null){
  return res.status(200).json(Token.player_name)
  }
  else{
    res.status(200).json('no user login')
  }
})


router.get('/listplayerbookings',verifyToken,(req,res,next)=>{
  const player_Id =Token.playerId
// console.log(player_Id)

     Bookings.find({playerId:player_Id}).populate({path:'playgroundId', select:'name -_id'}).then(bookings=>  {

      //  console.log(bookings);
    res.json(bookings)

            }).catch(error=>{
              res.status(500).json({
                message:'Sorry, somthing went wrong!!'
              })
            });
      });
   

router.get('/remove/:id',verifyToken,(req,res,next)=>{
const player_Id =Token.playerId

  Bookings.findOneAndDelete({_id:req.params.id}).then(booking=>{
    // console.log(booking)
    var indexOfBookingIdInCart=-1;
    Player.findOne({_id:player_Id}).then(player=>{
      // console.log(player)
      for (let i=0; i<player.cart.bookingIds.length; i++){
                if(req.params.id===player.cart.bookingIds[i].toString()){
                    indexOfBookingIdInCart=i;
                    console.log("found the booking id in player's cart has booked");
                    break;
                }
      }
      if(indexOfBookingIdInCart>=0){
          var bookingDeleted=player.cart.bookingIds[indexOfBookingIdInCart].toString()
          console.log(bookingDeleted+' delete this booking from player cart of index '+indexOfBookingIdInCart)
          console.log(player.cart.totalPrice)
          player.cart.totalPrice-=booking.totalPrice
          console.log(player.cart.totalPrice)
          player.cart.bookingIds.pull(bookingDeleted)
          Player.updateOne({_id : player_Id},{$set:player},err=>{if(err)console.log(err)});
      }
    })
    })
  })


module.exports = router;