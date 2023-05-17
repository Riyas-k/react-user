const { response } = require("express");
const db = require("../models/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  postSignup: async (req, res) => {
    const data = req.body;

    try {
      const user = await db.user.findOne({ email: data.email });
      if (user) {
        console.log("enter");
        return res.json({ status: false, err: "Already Exist" });
        // User with the given email already exists
      }

      const hashPassword = await bcrypt.hash(data.password, 10);
      const newUser = new db.user({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashPassword,
      });

      await newUser.save().then((response) => {
        res.json({ status: true });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  postLogin: async (req, res) => {
    try {
      const data = req.body;
      const user = await db.user.findOne({ email: data.email });
      if (user) {
        await bcrypt.compare(data.password, user.password).then((response) => {
          if (response) {
            const token = jwt.sign({ _id: user._id }, "secret", {
              expiresIn: "30d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            return res.json({ status: true, token, user });
          } else {
            return res.json({ status: false, err: "Incorrect details" });
          }
        });
      } else {
        return res.json({ status: false, err: "Incorrect details" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  imagePost: async (req, res) => {
    const data = {
      userId: req.body.user._id,
      url: req.body.url,
    };
    await db.user
      .updateOne({ _id: req.params.id }, { $set: { photo: data.url } })
      .then((response) => {
        res.json({ status: true, data });
      });
  },
  getUserDetails: async (req, res) => {
   
    await db.user.findOne({ _id: req.params.id }).then((response) => {
      res.json({status:true,response})
 
    });
  },
  searchData:async(req,res)=>{
    const data = req.query.inputData;
    await db.user.findOne({name:data}).then((response)=>{
    if(response){
      res.json({status:true,response})
    }else{
      res.json({status:false,response})
    }
    })
  }
};
