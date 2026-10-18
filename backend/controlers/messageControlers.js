
// const cloudinary = require("../lib/cloudinary");
// const { getRecieverSocketId, io} = require("../lib/socket");
// const Message = require("../models/Message")
// const user = require("../models/user")

// const getUsersForSidebar = async(req,res)=> {
// try{
//     const loggedInUserId = req.user.userId;
//     const filteredUsers = await user.find({_id: {$ne:loggedInUserId}}).select("-password");

//     res.status(200).json(filteredUsers);

// }catch(error){
// // console.error("Error in getuserforsidebar", error.message);
// res.status(500).json({error: "Internal server error"});

// }

// };



// const getMessages = async(req,res)=>{
//     try{
//         const {id:userToChatId} = req.params
//         const myId = req.user.userId;

//         const messages = await Message.find({
//             $or:[
//                 {senderId:myId, receiverId:userToChatId},
//                 {senderId:userToChatId, receiverId:myId}
//             ]
//         })

//         res.status(200).json(messages)
//     }catch(error){
//         // console.log("Error in getMessages controller",error.message);
//         res.status(500).json({error: "Internal server error"});
//     }
// };


// const sendMessages = async (req,res) =>{
// try{
//   const {text, image} = req.body;
//   const { id: receiverId} = req.params;
//   const senderId = req.user.userId;

//   let imageUrl;
//   if( image){
//     // upload base64 image to cloudinary 
//     const uploadResponse = await cloudinary.uploader.upload(image);
//     imageUrl = uploadResponse.secure_url;
//   }

//   const newMessage = new Message({
//     senderId,
//     receiverId,
//     text,
//     image: imageUrl,
//   });

//   await newMessage.save();

//   //todo: realtime functionality goes here => soket.io
//   const RecieverSocketId = getRecieverSocketId(receiverId);
//   if(RecieverSocketId){
//     io.to(RecieverSocketId).emit("newMessage",newMessage);
//   }



//    res.status(201).json(newMessage)
// }catch(error){
//   //  console.log("Error in sendMessage controler:", error.message);
//    res.status(500).json({error: "Internal server error"});
// }
// };

// module.exports = {
//   getUsersForSidebar,
//   getMessages,
//   sendMessages,
// };




const mongoose = require("mongoose");
const cloudinary = require("../lib/cloudinary");
const { emitToUser } = require("../lib/socket");
const Message = require("../models/Message");
const User = require("../models/user");
const Connection = require("../models/Connection");

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

async function canChat(userA, userB) {
  if (
    !validId(userA) ||
    !validId(userB) ||
    String(userA) === String(userB)
  ) {
    return false;
  }

  const connection = await Connection.findOne({
    $or: [
      { requester: userA, recipient: userB },
      { requester: userB, recipient: userA },
    ],
  }).select("status");

  return connection?.status === "accepted";
}

const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user.userId;

    const connections = await Connection.find({
      status: "accepted",
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate("requester", "fullName email profilePic")
      .populate("recipient", "fullName email profilePic");

    const users = connections
      .map((connection) =>
        String(connection.requester._id) === String(userId)
          ? connection.recipient
          : connection.requester
      )
      .filter(Boolean);

    return res.status(200).json(users);
  } catch (error) {
    console.error("getUsersForSidebar:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getMessages = async (req, res) => {
  try {
    const myId = req.user.userId;
    const { id: otherUserId } = req.params;

    if (!validId(otherUserId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!(await canChat(myId, otherUserId))) {
      return res.status(403).json({
        message: "You can only message accepted connections.",
      });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("getMessages:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const sendMessages = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    if (!validId(receiverId)) {
      return res.status(400).json({ message: "Invalid recipient ID." });
    }

    if (!(await canChat(senderId, receiverId))) {
      return res.status(403).json({
        message: "You can only message accepted connections.",
      });
    }

    const cleanText = typeof text === "string" ? text.trim() : "";
    const hasImage = typeof image === "string" && image.length > 0;

    if (!cleanText && !hasImage) {
      return res.status(400).json({
        message: "A message must contain text or an image.",
      });
    }

    if (hasImage && !image.startsWith("data:image/")) {
      return res.status(400).json({
        message: "The image must be a valid image data URL.",
      });
    }

    let imageUrl;

    if (hasImage) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "milescloser/messages",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: cleanText || undefined,
      image: imageUrl,
    });

    // Notify every active socket for the recipient.
    emitToUser(receiverId, "newMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendMessages:", error.message);
    return res.status(500).json({ message: "Unable to send message." });
  }
};

module.exports = {
  getUsersForSidebar,
  getMessages,
  sendMessages,
};
