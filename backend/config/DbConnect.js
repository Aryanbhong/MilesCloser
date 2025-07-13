const mongoose = require("mongoose");
require("dotenv").config();


const connectDb = async ()=>{
    try{
     await  mongoose.connect(process.env.CLOUD_NAME)
 
     console.log("db connected succesfully...");
    }catch(error){
     
     console.error(error.message);
     process.exit(1);
         
    }
 };

module.exports= connectDb

