const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require('body-parser')
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/danish").then(() => {
  console.log("Connected to mongodb");
});

//create schema
const schema = new mongoose.Schema({
  name: String,
  password: String,
});

//model
const createdModel = mongoose.model("Danish-auth", schema);

// const doc = new createdModel({
//   name: "danish",
//   password: "10101",
// });

// doc.save();

// app.get("/getData", async (req, res) => {
//   const docs = await createdModel.findOne();
//   res.send(docs);
// });

app.get("/", (req, res) => {
  res.render('index')
});



app.post("/addData", (req, res) => {
  const docs = new createdModel({
    name: req.body.name,
    password: req.body.password,
  });
  docs.save()
  res.send("data added")
});

app.post('/login',async(req,res)=>{
    const findUser= await createdModel.findOne({name:req.body.name,password:req.body.password})
    if(findUser)
    {
        res.send(findUser.name + ' you are loginned successfully')
    }
    else{
        res.send("no user found")
    }
})

app.patch('/updatePassword',async(req,res)=>{
  const updatedUser=await createdModel.findByIdAndUpdate({name:req.body.name})
})
app.listen(3000);
