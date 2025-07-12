
const cloudinary = require("../lib/cloudinary");
const { getRecieverSocketId, io} = require("../lib/socket");
const Message = require("../models/Message")
const user = require("../models/user")

const getUsersForSidebar = async(req,res)=> {
try{
    const loggedInUserId = req.user.userId;
    const filteredUsers = await user.find({_id: {$ne:loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers);

}catch(error){
// console.error("Error in getuserforsidebar", error.message);
res.status(500).json({error: "Internal server error"});

}

};



const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params
        const myId = req.user.userId;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }catch(error){
        // console.log("Error in getMessages controller",error.message);
        res.status(500).json({error: "Internal server error"});
    }
};


const sendMessages = async (req,res) =>{
try{
  const {text, image} = req.body;
  const { id: receiverId} = req.params;
  const senderId = req.user.userId;

  let imageUrl;
  if( image){
    // upload base64 image to cloudinary 
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  //todo: realtime functionality goes here => soket.io
  const RecieverSocketId = getRecieverSocketId(receiverId);
  if(RecieverSocketId){
    io.to(RecieverSocketId).emit("newMessage",newMessage);
  }



   res.status(201).json(newMessage)
}catch(error){
  //  console.log("Error in sendMessage controler:", error.message);
   res.status(500).json({error: "Internal server error"});
}
};

module.exports = {
  getUsersForSidebar,
  getMessages,
  sendMessages,
};