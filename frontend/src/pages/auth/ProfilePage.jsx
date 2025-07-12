// import { useState, useEffect } from "react";
// import { useAuthStore } from "../../utils/useAuthStore";
// import { Camera, Mail, User } from "lucide-react";
// import axiosInstance from '../../utils/axiosinstance';

// const ProfilePage = () => {
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//         console.log(response.data.user);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//  const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) {
//     console.log("file nahi hai");
//     return;
//   }

//   const reader = new FileReader();
//   reader.readAsDataURL(file);

//   reader.onload = async () => {
//     const base64Image = reader.result;
//     setSelectedImg(base64Image);
//     try {
//       await updateProfile({ profile: base64Image });
//       console.log("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error?.response?.data?.message || error.message);
//       alert(error?.response?.data?.message || "Failed to update profile");
//     }
//   };

//   reader.onerror = () => {
//     console.error("File reading error");
//     alert("Failed to read the image file");
//   };
// };


//   return (
//     <div className="h-screen pt-20">
//       <div className="max-w-2xl mx-auto p-4 py-8">
//         <div className="bg-base-300 rounded-xl p-6 space-y-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold ">Profile</h1>
//             <p className="mt-2">Your profile information</p>
//           </div>

//           {/* Avatar upload section */}
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || userInfo?.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="size-32 rounded-full object-cover border-4 "
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
//                   isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
//                 }`}
//               >
//                 <Camera className="w-5 h-5 text-base-200" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <p className="text-sm text-zinc-400">
//               {isUpdatingProfile
//                 ? "Uploading..."
//                 : "Click the camera icon to update your photo"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
//                 {userInfo?.fullName}
//               </p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
//                 {userInfo?.email}
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 bg-base-300 rounded-xl p-6">
//             <h2 className="text-lg font-medium mb-4">Account Information</h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center justify-between py-2 border-b border-zinc-700">
//                 <span>Member Since</span>
//                 {/* <span>{userInfo?.createdAt?.split("T")[0]}</span> */}
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span>Account Status</span>
//                 <span className="text-green-500">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import { useState, useEffect } from "react";
import { useAuthStore } from "../../utils/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import axiosInstance from '../../utils/axiosinstance';
import uploadImg from "../../utils/uploadImg";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = async () => {
  
  //     setSelectedImg();
  //     try {
  //       await updateProfile({ profile: base64Image });
  //     } catch (error) {
  //       alert(error?.response?.data?.message || "Failed to update profile");
  //     }
  //   };

  //   reader.onerror = () => {
  //     alert("Failed to read the image file");
  //   };
  // };
  
  const handleImageUpload = async (e) => {
  // const file = e.target.files[0];
  // if (!file) return;

  // try {
  //   // Show image preview before upload completes
  //   const previewUrl = URL.createObjectURL(file);
  //   setSelectedImg(previewUrl);

  //   // Upload image to Cloudinary
  //   const imageUrl = await uploadImg(file); // This returns secure_url from Cloudinary

  //   // Send the URL to backend to update profile
  //   await updateProfile({ profile: imageUrl });

  // } catch (error) {
  //   console.error("Error updating profile:", error?.response?.data?.message || error.message);
  //   alert(error?.response?.data?.message || "Failed to update profile");
  // } const file = e.target.files[0];
  const file = e.target.files[0];

  if (!file) return;
  console.log("ye hai file behenchod", file)
  
  try {
    const response = await uploadImg(file);

    console.log("Image uploaded:", response.data.imageUrl);
    setProfilePic(response.data.imageUrl); // or update state

  } catch (err) {
    console.error("Error uploading image:", err);
  }
};




  return (
    <div className="h-screen pt-20 bg-zinc-900 text-white">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-zinc-800 rounded-xl p-6 space-y-8 shadow-lg shadow-pink-300/10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-pink-400">Profile</h1>
            <p className="mt-2 text-gray-400">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || userInfo?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-pink-400"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-zinc-700 rounded-lg border border-zinc-600">
                {userInfo?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-zinc-700 rounded-lg border border-zinc-600">
                {userInfo?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <h2 className="text-lg font-medium text-pink-400 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between py-2 border-b border-zinc-600">
                <span>Member Since</span>
                <span>{userInfo?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
