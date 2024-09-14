const express=require("express")

const a=prompt("enter the no")
console.log(a)
const app=express();

app.get('/',(req,res)=>{
    res.send("Home Page visited")
})

app.listen(3000)