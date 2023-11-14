const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET='PrateekRajisagoodb$oy';
// Route 1 : Create a user using :Post "api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("mobile","Enter a Valid Number").isLength({min:10}),
    body("mobile","Enter a Valid Number").isNumeric(),
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Valid Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //console.log("test1")
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //console.log("test3")
    try {
      let users = await Users.findOne({ email: req.body.email });
      if (users) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user already exist with this email" });
      }
      //console.log("test4")
      const salt=await bcrypt.genSalt(10);

      secPass=await bcrypt.hash(req.body.password,salt);
      //console.log("test5")
      users = await Users.create({
        name: req.body.name,
        mobile:req.body.mobile,
        password: secPass,
        email: req.body.email,
      });
      //console.log("test6")

      /*let users=await Users.create({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
  }).then(users=>res.json(users)).catch(err=>{//console.log(err)
  res.json({error:'Please enter Unique value',message:err.message})});*/
      //res.send(req.body)f
    const data={
      user:{
        id:users.id
      }
    }
    //console.log("test7")
     const Auth_Token= jwt.sign(data,JWT_SECRET);
      //res.json({ Successs: "Data Inserted Sucessfully" });
      success=true;
      res.json({success,Auth_Token});
    } catch (error) {
      //console.log(error.message);
      res.status(500).json({success,error:"Internal Server Error Occurred"});
    }
  }
);
// Route 2 : Authenticate a user using :Post "api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      let user=await Users.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please login with correct condential"});
      }
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error:"Please login with correct condential"});
      }
      const data={
        user:{
          id:user.id
        }
      }
      const Auth_Token=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,Auth_Token});
    } catch (error) {
      //console.log(error.message);
      return res.status(500).json({success,error:"Internal Server Error Occurred"});
    }


  })

// Route 3 : Get Logedin user using :Post "api/auth/getuser".login required
router.post(
  "/getuser",fetchuser,async (req,res)=>{
try {
  var userId=req.user.id;
  const user=await Users.findById(userId0).select("-password")
  res.send(user);
} catch (error) {
  //console.log(error.message);
  res.status(500).send("Internal Server Error Occurred");
}
  })

module.exports = router;
