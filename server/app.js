const path = require('path');
const http=require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const MONGODB_URI='mongodb+srv://we:itigrad@cluster0-8wq1d.mongodb.net/grad?retryWrites=true&w=majority'
const app = express();

const adminRoutes = require("./routes/admin");
const playgroundRoutes = require("./routes/playgrounds");
const playerRoutes = require("./routes/player");
const bookingRoutes= require('./routes/bookings')



mongoose.connect(
    MONGODB_URI,
     {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      }
     )
   .then(result =>{ 
     app.listen(3000,()=>{
       console.log("server connected");
     })
   } )
   .catch(err =>{
     console.log(err);
   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/admin", adminRoutes);
app.use("/playgrounds", playgroundRoutes);
app.use("/player", playerRoutes);
app.use("/bookings", bookingRoutes);


  