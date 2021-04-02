const express = require("express");
const mongoose=require('mongoose'); 
const multer=require('multer');
const Playground = require("../models/playground");
const checkAuth=require('../middleware/check');
const Egycity=require('../models/egycity')
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.get("/ownerPlayground",checkAuth, (req, res, next) => {
  console.log(typeof(req.adminData.adminId))
  var adminId=mongoose.Types.ObjectId(req.adminData.adminId)
  console.log(typeof(adminId))
  console.log(adminId) 
  // console.log(adminId)
    Playground.findOne({ownerId:adminId}).then(playground => {
        if (playground) {
          console.log(playground)
          res.status(200).json(playground);
        } else {
          res.status(404).json({ message: "playground not found!" });
        }
      })
      .catch(error=>{
        res.status(500).json({
          message:'Sorry, somthing went wrong!!'
        })
      });
    }); 

 

router.get("/getPlaygrounds", (req, res, next)=>{
  console.log(req.query) 
  const pageSize= +req.query.pagesize;
  const currentPage= +req.query.page;
  const sortingOrder= +req.query.sortingOrder
  console.log(typeof(sortingOrder));
  let fetchedPlygrounds;
  const mong=Playground.find()
  if(pageSize && currentPage){
    mong.sort({price:sortingOrder}).skip(pageSize * (currentPage - 1))
  .limit(pageSize)
  }
  mong.then(documents => {
    fetchedPlygrounds=documents;
     return Playground.count()
    })
     .then(count =>{
       console.log(count)
      res.status(200).json({
        message: "Playgrounds fetched successfully!",
        playgrounds:fetchedPlygrounds,
        maxPlaygrounds:count
      });
     })
     .catch(error=>{
      res.status(500).json({
        message:'Fetching Playgrounds Failed!!'
      })
    }); 
  });


  router.get("/mapCity", (req, res, next) => {
    console.log('yhgfjhgjhygjy')
    location=req.query.location
    console.log(location)
    console.log(typeof(location)) 
   Egycity.findOne({city:location}).then(locationData => {
       if (locationData) {
         console.log(locationData.lat)
         console.log(locationData.lat.valueOf())
        console.log(locationData)
         res.status(200).json(locationData);
       } else {
         res.status(404).json({ message: "location not found!" });
       }
     })
     .catch(error=>{
       res.status(500).json({
         message:'Fetching Location Failed!!'
       })
     });
   });  
      

router.get("/:id", (req, res, next) => {
  Playground.findById(req.params.id).then(playground => {
      if (playground) {
        res.status(200).json(playground);
      } else {
        res.status(404).json({ message: "playground not found!" });
      }
    })
    .catch(error=>{
      res.status(500).json({
        message:'Fetching Playground Failed!!'
      })
    });
  }); 

 
router.post('/postPlay',checkAuth,
      multer({ storage: storage }).single("image"),(req,res,next)=>{
      const url = req.protocol + "://" + req.get("host"); 
      console.log(req.body);
      
      const playground=new Playground({
        name:req.body.name,
        description:req.body.description,
        owner:req.body.owner,
        price:JSON.parse(req.body.price),
        phone:req.body.phone,
        pmHours:JSON.parse(req.body.pmHours),
        amHours:JSON.parse(req.body.amHours),
        location:req.body.location,
        imagePath: url + "/images/" + req.file.filename,
        ownerId:req.adminData.adminId
       });
       playground.save().then(createdPlayground => {
      
        res.status(201).json({
          message: "Playground added successfully",
          playground: {
            ...createdPlayground,
            id:createdPlayground._id 
             
          }
        });
      })
      .catch(error=>{
        res.status(500).json({
          message:'You already have playground for this account'
        })
      });
    });

router.put(
      "/:id",checkAuth,
      multer({ storage: storage }).single("image"),
      (req, res, next) => {
        let imagePath = req.body.imagePath;
        console.log(imagePath)
        let playground;
        if (req.file) {
          const url = req.protocol + "://" + req.get("host");
          imagePath = url + "/images/" + req.file.filename;
          playground=new Playground({
            _id: req.body.id,
            name:req.body.name,
            description:req.body.description,
            owner:req.body.owner,
            price:JSON.parse(req.body.price),
            phone:req.body.phone,
            pmHours:JSON.parse(req.body.pmHours),
            amHours:JSON.parse(req.body.amHours),
            location:req.body.location,
            imagePath:imagePath,
            ownerId:req.adminData.adminId
           });
           console.log(playground);

        }
        else{
         playground = new Playground({
         _id: req.body.id,
         name:req.body.name,
         description:req.body.description,
         owner:req.body.owner,
         price:req.body.price,
         phone:req.body.phone,
         pmHours:req.body.pmHours,
         amHours:req.body.amHours,
         location:req.body.location,
         imagePath:imagePath,
         ownerId:req.adminData.adminId
        });
      }
        console.log(playground);
        Playground.updateOne({ _id: req.params.id }, playground)
        .then(result => {
          res.status(200).json({ message: "Update successful!" });
        })
        .catch(error=>{
          res.status(500).json({
            message:'Updating Failed!!'
          })
        });
       
 }) 
     




module.exports = router;

  
  