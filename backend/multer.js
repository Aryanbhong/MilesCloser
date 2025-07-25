const multer = require("multer")
const path = require("path");

//storage configuration 

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./uploads/"); //destination folder for storing images 
    },
    filename: function (req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname)); //unique filename
    },

});

//file filter to accept only imagesw 
const fileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("only images are allowed"), false);
    }
};


/// intialize multer instance 

const upload = multer({storage, fileFilter});

module.exports = upload;