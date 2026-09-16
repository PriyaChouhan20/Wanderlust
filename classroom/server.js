const express = require("express");
const app = express();
const users = require ("./routers/user.js");
const posts = require("./routes/post.js");
const session=require("express-session");
app.use(
    session({
        secret:"mysupersecretstring",
        resave:false,
        saveUnitialized:true,
    })
);
app.get("/reqcount", (req, res) => {
    req.session.count = (req.session.count || 0) + 1;

    res.send(`You sent a request ${req.session.count} times`);
});
const session =require({secret: "mysupersecretstring"});

app.get("/test",(req,res)=>{
    res.send("test successful!");
});


app.listen(3000,()=>{
    console.log("server is listening to 3000");
});