const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const fs = require("fs")
const path = require("path")
const  {authenticateToken} = require("./utils")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../backend/models/user");
const DayStory = require("../backend/models/Notes");
const fileUpload = require("express-fileupload");
const uploadImageToCloudinary = require("./utils/imageUploader");
const connectDb = require("./config/DbConnect");
const { error, profile } = require("console");
const cloudinary = require("./lib/cloudinary");
const { app, server } = require("./lib/socket");

const rootDir = path.resolve(__dirname, "..");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  })
);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));
connectDb();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const messageRoutes = require("./routes/messagesRoutes");
app.use("/api/messages", messageRoutes)
const uploadRoutes = require('./routes/upload');
app.use(uploadRoutes);
const authRoutes =require("./routes/authRoutes");
app.use("/api/auth",authRoutes)

server.listen(process.env.PORT || 8000, ()=>{
    console.log("server is running on port ",process.env.PORT);
})
module.exports= app;






















app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const profileFile = req.files?.profile;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    let imageUrl;
    if (profileFile && profileFile.tempFilePath) {
      try {
        const fixedPath = path.resolve(profileFile.tempFilePath);
        // console.log("Fixed temp file path for Cloudinary:", fixedPath);

        const uploadResponse = await uploadImageToCloudinary(fixedPath);
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        // console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          error: true,
          message: "Failed to upload profile image",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic: imageUrl,
    });

    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "72h",
      }
    );

    return res.status(201).json({
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    // console.error("Error in create-account:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});



//sigin
app.post("/signIn",async (req, res)=>{
    const {email, password} = req.body;


    if(!email || !password){
        return res.status(400).json({
            message: "Email and Password are Required"
        });
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "User not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: " User Credential are inValid"
        })
    };

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.json({
        error: false,
        message: "Login Succesful",
        user: { fullName: user.fullName, email: user.email},
        accessToken,
    });
} );

//get-user
app.get("/get-user",  authenticateToken, async(req, res) =>{
try{
    
    const {userId} = req.user;

    const isUser = await User.findOne({_id: userId});

    if(!isUser){
        return res.status(401);

    }

    return res.json({
        user: isUser,
        message:"",
    });
}
catch(error){
    return res.status(500).json({
        message:" can't get user"
    })
}
});

app.post('/add-note', authenticateToken, async (req, res) => {
  try {
    const { title, story, visitedDate, sharedWithEmail } = req.body;
    const visitedLocation = JSON.parse(req.body.visitedLocation || "[]");
    const image = req.files?.image;
    const { userId } = req.user;
    //  console.log("add note wala data", title,story, visitedDate,sharedWithEmail)
    if (!title || !story || !visitedDate) {
      return res.status(400).json({
        error: true,
        message: "Title, story, and visited date are required.",
      });
    }

    let imageUrl = "";
    if (image) {
      const uploaded = await uploadImageToCloudinary(image.tempFilePath, {
        folder: "milesCloserData"
      });
      imageUrl = uploaded.secure_url;
    }

    // Lookup user by sharedWithEmail
    let sharedWith = [];
    if (sharedWithEmail) {
      const sharedUser = await User.findOne({ email: sharedWithEmail });
      // console.log("shared userrr",sharedUser)
      if (sharedUser) {
        sharedWith.push(sharedUser._id);
      } else {
        return res.status(404).json({
          error: true,
          message: "User with the provided email not found.",
        });
      }
    }
    console.log("create karne se pehle", sharedWith)
    const dayStory = new DayStory({
      title,
      story,
      visitedLocation,
      visitedDate: new Date(parseInt(visitedDate)),
      imageUrl,
      userId,
      sharedWith: sharedWith, // now using correct field with user ObjectId
    });

    await dayStory.save();
    //  console.log("Saved dayStory:", dayStory);
    res.status(200).json({
      story: dayStory,
      message: "Note added successfully"
    });

  } catch (error) {
    // console.error("Error in /add-note:", error.message);
    res.status(500).json({
      error: true,
      message: "Server error: " + error.message,
    });
  }
});

//get all stories 
app.get("/getall-stories", authenticateToken, async(req, res)=>{

    // console.log(" frontend se request ayi hai");
  //  try{
    const {userId}= req.user;
   try {
    const dailyStories = await DayStory.find({
      $or: [
        { userId: userId },
        { sharedWith: userId }  // <- Notes shared with this user
      ]
    })
    .populate('userId', 'fullName email')  // populate creator info
    .populate('sharedWith', 'fullName email')
    .sort({ isFavourite: -1 });

    res.status(200).json({ stories: dailyStories });
    // console.log("dailystories data", dailyStories)
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
})
 
app.get('/search-user', authenticateToken, async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email }).select('_id email fullName');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



app.post("/upload-image", async(req,res)=>{
try{
    if(!req.file){
        return res.status(400).json({
            error: true,
            message: "No image uploaded"
        });
    }
      
    const imageUrl =`http://localhost:8000/uploads/${req.file.filename}`;

    res.status(200).json({imageUrl});
}catch(error){
    res.status(500).json({error: true,
        message: error.message
    });
}
})


// delete an image from uploads folder 
app.delete("/delete-image", async(req, res)=>{
    try{
        const{ imageUrl} = req.query;

    if(!imageUrl){
        return res.status(400).json({
            error:true,
            message:"imageUrl parameter is required"
        });
    }

    try{
        // extract the imageurl 
        const filename = path.basename(imageUrl);

        // define the file path 
        const filePath = path.join(__dirname, 'uploads', filename);

        //check if the files exist  
        if(fs.existsSync(filePath)){
            // delete the file fro  the uploads folder  
            fs.unlinkSync(filePath);
            res.status(200).json({
                message: "Image deleted successfulyy"
            });
        }else{
            res.status(200).json({
                error: true,
                message: " Image not found"
            });
        }
    }catch(error){
       res.status(500).json({
        error: true,
        message: error.message
       })
    }
    }catch(error){
        return res.status(500).json({
            message: " errroror"
        })
    }
});

//edit story 
app.put("/edit-story/:id", authenticateToken, async(req, res) =>{
    const {id} = req.params;
    const {title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const {userId} = req.user;

   try{
      // validate required fields 
    if(!title || !story || !visitedLocation  || !visitedDate){
        return res.status(400).json({
            error: true,
            message:" All fields are required"
        });
    }

    //convert miliiseconds to date 
    const dateParsed = new Date(parseInt(visitedDate));

    try{
        // find the story by id and ensure it belonged to the authenticated user
        const dayStory = await DayStory.findOne({_id: id, userId: userId});

        if(!dayStory){
            return res.status(404).json({error: true, 
                message: " day story note found "
            })
        }

        const placeholderImageUrl = "http://localhost:3000/assets/placeholder.jpg";

        dayStory.title = title;
        dayStory.story= story;
        dayStory.visitedLocation = visitedLocation;
        dayStory.imageUrl = imageUrl || placeholderImageUrl;
        dayStory.visitedDate = dateParsed;

        await dayStory.save();
        res.status(200).json({story: dayStory,
            message: "Update Successful"
        });
    }catch(error){
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
   }catch(error){
    res.status(500).json({
        error: true,
        message: error.message
    });
   }
})


//delete a story 
app.delete("/delete-story/:id", authenticateToken, async (req,res)=>{
    const { id } = req.params;
    const { userId } = req.user;

    try{
        // find the story by id and ensure it belongs to the authenticated user 
        const dayStory = await DayStory.findOne({_id: id, userId: userId});

        if(!dayStory){
            return res
            .status(404)
            .json({error: true ,
                message: "story not found"
            });
        }

        //Delete the story from the database 
        await dayStory.deleteOne({ _id: id, userId: userId});

        //extract the filename from the imageUrl
        const imageUrl = dayStory.imageUrl;
        const filename = path.basename(imageUrl);

        //define the file path 
        const filePath = path.join(__dirname, 'uploads', filename);

        //delete the image file from the uploads folder 
        fs.unlink(filePath,(err)=>{
            if(err){
                console.error("failed to delete image file", err);
                // Optionally, you could still respond with a success status here
                // if you don't want to trent this as a critical error,
            }
        });
        
        res.status(200).json({message: "Story deleted succesfully"});
    }catch(error){
        res.status(500).json({error: true,
            message: error.message
        });
    }
})

//update isFavourite 
app.put("/update-is-favourite/:id", authenticateToken, async (req,res) =>{
   try{
    const { id} = req.params;
    const { isFavourite} = req.body;
    const { userId } = req.user;

   try{
   const dayStory = await DayStory.findOne({ _id: id, userId: userId});

   if(!dayStory){
    return res.status(404).json({
        error: true,
        message: "Day story not found"
    });
   }

   dayStory.isFavourite = isFavourite;

   await dayStory.save();
   res.status(200).json({ story: dayStory,
    message:"Update Successful"
   });
   }catch(error){
    res.status(500).json({error: true,
        message: error.message
    });
   }

   }catch(error){
    res.status(500).json({error: true,
        message: error.message
    });
   }
})

//Search travel stories 
app.get("/search" , authenticateToken, async(req, res)=>{
    const { query } = req.query;
    const { userId } = req.user;

    if(!query){
        return res.status(404).json({
            error: true,
            message: "query is required"
        });
    }

    try{
     const serachResults = await DayStory.find({
        userId: userId,
        $or:[
            {title: {$regex: query, $options: "i"}},
            { story: { $regex: query, $options: "i"}},
            { visitedLocation: { $regex: query, $options: "i"}},
        ],
     }).sort({ isFavourite: -1});

     res.status(200).json({stories: serachResults});
    }catch(error){
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
})


//Filter travel stories by date range
app.get("/notes/filter", authenticateToken, async (req,res)=>{
  const { startDate, endDate } = req.query;
  const { userId } = req.user;

  try{
  
  const start = new Date(parseInt(startDate));
  const end = new Date(parseInt(endDate));


  
  const filteredStories = await DayStory.find({
    userId: userId,
    visitedDate: { $gte: start,
        $lte: end
    },
  }).sort({ isFavourite: -1});
  
  res.status(200).json({stories: filteredStories});
  }catch(error){
    res.status(500).json({
        error:true,
        message: error.message
    });
  }
})




app.put("/updateProfile",authenticateToken,async(req,res)=>{
  
    const userId = req.user.id; // Assuming you're using auth middleware
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ message: "Profile image URL is required" });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { profilePic: profile },
    { new: true }
  );

  res.json(user);
  console.log("updated")
})

app.use(express.static(path.join(rootDir,"/frontend/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

