const mongoose = require("mongoose");
require("dotenv").config();


const connectDb = async ()=>{
    try{
     await  mongoose.connect('mongodb://aryanbhong18:n3EKeOnblbwlVPJf@milescloser-shard-00-00.x7cg6.mongodb.net:27017,milescloser-shard-00-01.x7cg6.mongodb.net:27017,milescloser-shard-00-02.x7cg6.mongodb.net:27017/?replicaSet=atlas-uae5p4-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=MilesCloser')
 
     console.log("db connected succesfully...");
    }catch(error){
     
     console.error(error.message);
     process.exit(1);
         
    }
 };

module.exports= connectDb

