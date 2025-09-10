const express=require('express');//import package
const app=express();//blueprint i.e. instance
const db=require('./db')
require('dotenv').config()

const bodyparser=require('body-parser')//stores in req.body
app.use(bodyparser.json());

app.get('/',function(req,res){
    res.send("hello world")
})

//import routes
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(3001, ()=>{
    console.log("server is listening on port 3001")
});//where we will find our server