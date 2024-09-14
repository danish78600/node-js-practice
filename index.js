const express=require("express")
const mongoose=require("mongoose")
const app=express();

mongoose.connect("mongodb://localhost:27017/danish").then(()=>{
    console.log("Connected to mongodb")
})

const schema=new mongoose.Schema({
    name:String,
    password:String
})

const createdModel=mongoose.model('Danish-auth',schema)

const doc=new createdModel({
    name:"danish",
    password:"10101"
})

doc.save()


app.get('/',(req,res)=>{
    res.send("Home Page visited")
})

app.get('/getData',async(req,res)=>{
    const docs=await createdModel.findOne()
    console.log(docs)
})

app.listen(3000)