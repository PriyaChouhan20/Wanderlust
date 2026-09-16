const express = require("express");
const router = express.Router();
const users = require("./routes/user.js");
//Index-users
router.get("/",(req,res)=>{
    res.send("GET for  users");
})
//show-users
router.get("/",(req,res)=>{
    res.send("GET for show  users");
})
//post-user
router.post("/",(req,res)=>{
    res.send("POST for  user");
})
//Delete-users
router.delete("//:id",(req,res)=>{
    res.send("DELETE for  user");
})
module.exports=router;
