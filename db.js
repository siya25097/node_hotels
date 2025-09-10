const mongoose =require('mongoose')
require('dotenv').config()
//define url for mongodb connection
// const mongoURL='mongodb://localhost:27017/hotels'
const mongoURL=process.env.DB_URL;
//once we establish connection it will show hotels database

//setup connection
mongoose.connect(mongoURL)//para for formatting url to latest version of db

//mongoose maintains default connection object representing mongodb connection
const db=mongoose.connection;

//event listener for databse connection
db.on('connected',()=>{
    console.log('Database connected!!');
});
db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});
db.on('disconnected',()=>{
    console.log('Database disconnected!!');
});

module.export=db;

