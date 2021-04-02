const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Nexmo = require('nexmo');
const Admin = require("../models/admin");
const router = express.Router();


const nexmo = new Nexmo({
  apiKey: '9f54ad6c',
  apiSecret: 'lD0MB4v6Xfb2hO2C',
});


router.post('/adminReset', (req, res, next) => {
  const phone= req.body.phone;
  console.log(phone)
  const fromSite="Offsite";
  const text='hello';
  nexmo.message.sendSms('Nexmo', phone, text);
  res.json('correct')

})
  
router.post("/adminSignup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const admin = new Admin({
      phone: req.body.phone,
      password: hash
    });
    admin
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Phone Number Already Exist'
        });
      });
  });
});

router.post("/adminLogin", (req, res, next) => {
  let fetchedUser;
  Admin.findOne({ phone: req.body.phone })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({
          message: "Phone number is incorrect"
        });
      }
      fetchedUser = admin;
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Error password ,Please type it again"
        });
      }
      const token = jwt.sign(
        { phone: fetchedUser.phone, adminId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid Phone or Password"
      });
    });
});



 

















module.exports = router;