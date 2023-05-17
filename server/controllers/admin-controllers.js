const jwt = require("jsonwebtoken");
const db = require('../models/connection');
const mongoose = require('mongoose');
const { response } = require("express");

let credentials = {
  email: "mohammedriyazriyaz04@gmail.com",
  password: "123",
};
module.exports = {
  adminLogin: (req, res) => {
    const data = req.body;
    if (
      credentials.email == data.email &&
      credentials.password == data.password
    ) {
      const token = jwt.sign({ credentials }, "secret", { expiresIn: "30d" });
      res.cookie("admin", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({ status: true });
    } else {
      res.json({ status: false, err: "Invalid credentials" });
    }
  },
  userDetails:async(req,res)=>{
    const user = await db.user.find()
    if(user){
        res.json({user})
    }else{
        res.json({err:'No users'})
    }
   
  },
  changeBlock: async (req, res) => {
  const userId = req.params.id
  await db.user.updateOne({_id: userId},{"$set":{"blocked":true} })
    .then((response) => {
      console.log(response);
      res.json({ status: true });
    });
},

changeUnBlock: async (req, res) => {
   const userId = req.params.id
  await db.user.updateOne({ _id:  userId },{ $set: { "blocked": false } })
    .then((response) => {
      console.log(response);
      res.json({ status: false });
    });
},
deleteUser:async(req,res)=>{
  const userId = req.params.id
  await db.user.deleteOne({_id:userId}).then((response)=>{
       res.json({status:true})
  })  
},

};
