// // import { useState, useEffect } from "react";
// // import { useAuthStore } from "../../utils/useAuthStore";
// // import { Camera, Mail, User } from "lucide-react";
// // import axiosInstance from '../../utils/axiosinstance';

// // const ProfilePage = () => {
// //   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
// //   const [selectedImg, setSelectedImg] = useState(null);
// //   const [userInfo, setUserInfo] = useState(null);

// //   const getUserInfo = async () => {
// //     try {
// //       const response = await axiosInstance.get("/get-user");
// //       if (response.data && response.data.user) {
// //         setUserInfo(response.data.user);
// //         console.log(response.data.user);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getUserInfo();
// //   }, []);

// //  const handleImageUpload = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) {
// //     console.log("file nahi hai");
// //     return;
// //   }

// //   const reader = new FileReader();
// //   reader.readAsDataURL(file);

// //   reader.onload = async () => {
// //     const base64Image = reader.result;
// //     setSelectedImg(base64Image);
// //     try {
// //       await updateProfile({ profile: base64Image });
// //       console.log("Profile updated successfully");
// //     } catch (error) {
// //       console.error("Error updating profile:", error?.response?.data?.message || error.message);
// //       alert(error?.response?.data?.message || "Failed to update profile");
// //     }
// //   };

// //   reader.onerror = () => {
// //     console.error("File reading error");
// //     alert("Failed to read the image file");
// //   };
// // };


// //   return (
// //     <div className="h-screen pt-20">
// //       <div className="max-w-2xl mx-auto p-4 py-8">
// //         <div className="bg-base-300 rounded-xl p-6 space-y-8">
// //           <div className="text-center">
// //             <h1 className="text-2xl font-semibold ">Profile</h1>
// //             <p className="mt-2">Your profile information</p>
// //           </div>

// //           {/* Avatar upload section */}
// //           <div className="flex flex-col items-center gap-4">
// //             <div className="relative">
// //               <img
// //                 src={selectedImg || userInfo?.profilePic || "/avatar.png"}
// //                 alt="Profile"
// //                 className="size-32 rounded-full object-cover border-4 "
// //               />
// //               <label
// //                 htmlFor="avatar-upload"
// //                 className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
// //                   isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
// //                 }`}
// //               >
// //                 <Camera className="w-5 h-5 text-base-200" />
// //                 <input
// //                   type="file"
// //                   id="avatar-upload"
// //                   className="hidden"
// //                   accept="image/*"
// //                   onChange={handleImageUpload}
// //                   disabled={isUpdatingProfile}
// //                 />
// //               </label>
// //             </div>
// //             <p className="text-sm text-zinc-400">
// //               {isUpdatingProfile
// //                 ? "Uploading..."
// //                 : "Click the camera icon to update your photo"}
// //             </p>
// //           </div>

// //           <div className="space-y-6">
// //             <div className="space-y-1.5">
// //               <div className="text-sm text-zinc-400 flex items-center gap-2">
// //                 <User className="w-4 h-4" />
// //                 Full Name
// //               </div>
// //               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
// //                 {userInfo?.fullName}
// //               </p>
// //             </div>

// //             <div className="space-y-1.5">
// //               <div className="text-sm text-zinc-400 flex items-center gap-2">
// //                 <Mail className="w-4 h-4" />
// //                 Email Address
// //               </div>
// //               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
// //                 {userInfo?.email}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="mt-6 bg-base-300 rounded-xl p-6">
// //             <h2 className="text-lg font-medium mb-4">Account Information</h2>
// //             <div className="space-y-3 text-sm">
// //               <div className="flex items-center justify-between py-2 border-b border-zinc-700">
// //                 <span>Member Since</span>
// //                 {/* <span>{userInfo?.createdAt?.split("T")[0]}</span> */}
// //               </div>
// //               <div className="flex items-center justify-between py-2">
// //                 <span>Account Status</span>
// //                 <span className="text-green-500">Active</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfilePage;
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../../utils/useAuthStore";
// import { Camera, Mail, User } from "lucide-react";
// import axiosInstance from '../../utils/axiosinstance';
// import uploadImg from "../../utils/uploadImg";

// const ProfilePage = () => {
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//   // const handleImageUpload = async (e) => {
//   //   const file = e.target.files[0];
//   //   if (!file) return;

//   //   const reader = new FileReader();
//   //   reader.readAsDataURL(file);

//   //   reader.onload = async () => {
  
//   //     setSelectedImg();
//   //     try {
//   //       await updateProfile({ profile: base64Image });
//   //     } catch (error) {
//   //       alert(error?.response?.data?.message || "Failed to update profile");
//   //     }
//   //   };

//   //   reader.onerror = () => {
//   //     alert("Failed to read the image file");
//   //   };
//   // };
  
//   const handleImageUpload = async (e) => {
//   // const file = e.target.files[0];
//   // if (!file) return;

//   // try {
//   //   // Show image preview before upload completes
//   //   const previewUrl = URL.createObjectURL(file);
//   //   setSelectedImg(previewUrl);

//   //   // Upload image to Cloudinary
//   //   const imageUrl = await uploadImg(file); // This returns secure_url from Cloudinary

//   //   // Send the URL to backend to update profile
//   //   await updateProfile({ profile: imageUrl });

//   // } catch (error) {
//   //   console.error("Error updating profile:", error?.response?.data?.message || error.message);
//   //   alert(error?.response?.data?.message || "Failed to update profile");
//   // } const file = e.target.files[0];
//   const file = e.target.files[0];

//   if (!file) return;
//   console.log("ye hai file behenchod", file)
  
//   try {
//     const response = await uploadImg(file);

//     console.log("Image uploaded:", response.data.imageUrl);
//     setProfilePic(response.data.imageUrl); // or update state

//   } catch (err) {
//     console.error("Error uploading image:", err);
//   }
// };




//   return (
//     <div className="h-screen pt-20 bg-zinc-900 text-white">
//       <div className="max-w-2xl mx-auto p-4 py-8">
//         <div className="bg-zinc-800 rounded-xl p-6 space-y-8 shadow-lg shadow-pink-300/10">
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold text-pink-400">Profile</h1>
//             <p className="mt-2 text-gray-400">Your profile information</p>
//           </div>

//           {/* Avatar upload section */}
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || userInfo?.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="size-32 rounded-full object-cover border-4 border-pink-400"
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 p-2 rounded-full cursor-pointer transition-all duration-200 ${
//                   isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
//                 }`}
//               >
//                 <Camera className="w-5 h-5 text-white" />
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
//             <p className="text-sm text-gray-400">
//               {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-gray-400 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-zinc-700 rounded-lg border border-zinc-600">
//                 {userInfo?.fullName}
//               </p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-gray-400 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-zinc-700 rounded-lg border border-zinc-600">
//                 {userInfo?.email}
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 bg-zinc-800 rounded-xl p-6 border border-zinc-700">
//             <h2 className="text-lg font-medium text-pink-400 mb-4">Account Information</h2>
//             <div className="space-y-3 text-sm text-gray-300">
//               <div className="flex items-center justify-between py-2 border-b border-zinc-600">
//                 <span>Member Since</span>
//                 <span>{userInfo?.createdAt?.split("T")[0]}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span>Account Status</span>
//                 <span className="text-green-400">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




// import { useState, useEffect } from 'react'
// import {
//   Camera,
//   Mail,
//   User,
//   CalendarDays,
//   ShieldCheck,
//   Heart,
//   Sparkles,
//   ImagePlus,
//   CheckCircle2,
// } from 'lucide-react'
// import { useAuthStore } from '../../utils/useAuthStore'
// import axiosInstance from '../../utils/axiosinstance'
// import uploadImg from '../../utils/uploadImg'

// const ProfilePage = () => {
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

//   const [selectedImg, setSelectedImg] = useState(null)
//   const [userInfo, setUserInfo] = useState(null)
//   const [uploadError, setUploadError] = useState('')
//   const [uploadSuccess, setUploadSuccess] = useState(false)

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get('/get-user')

//       if (response.data?.user) {
//         setUserInfo(response.data.user)
//       }
//     } catch (error) {
//       console.error('Failed to fetch user information:', error)
//     }
//   }

//   useEffect(() => {
//     getUserInfo()
//   }, [])

//   // Clean up temporary preview URLs
//   useEffect(() => {
//     if (!selectedImg) return

//     return () => {
//       URL.revokeObjectURL(selectedImg)
//     }
//   }, [selectedImg])

//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0]

//     // Allow selecting the same image again later
//     e.target.value = ''

//     if (!file) return

//     setUploadError('')
//     setUploadSuccess(false)

//     if (!file.type.startsWith('image/')) {
//       setUploadError('Please select a valid image file.')
//       return
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('Your image must be smaller than 5MB.')
//       return
//     }

//     const previewUrl = URL.createObjectURL(file)
//     setSelectedImg(previewUrl)

//     try {
//       // Upload the image using your existing helper
//       const response = await uploadImg(file)

//       const imageUrl =
//         response?.data?.imageUrl ||
//         response?.data?.secure_url ||
//         response?.imageUrl ||
//         response?.secure_url

//       if (!imageUrl) {
//         throw new Error(
//           'The image was uploaded, but no image URL was returned.'
//         )
//       }

//       // Save the uploaded URL through your existing auth store
//       await updateProfile({ profile: imageUrl })

//       setUserInfo((prev) => ({
//         ...(prev || authUser || {}),
//         profilePic: imageUrl,
//       }))

//       setSelectedImg(null)
//       setUploadSuccess(true)
//     } catch (error) {
//       console.error('Error updating profile:', error)

//       setSelectedImg(null)
//       setUploadError(
//         error?.response?.data?.message ||
//           error?.message ||
//           'Failed to update your profile photo.'
//       )
//     }
//   }

//   const profilePic =
//     selectedImg ||
//     userInfo?.profilePic ||
//     authUser?.profilePic ||
//     '/avatar.png'

//   const fullName = userInfo?.fullName || authUser?.fullName || 'Your Name'
//   const email = userInfo?.email || authUser?.email || 'No email available'

//   const createdAt = userInfo?.createdAt || authUser?.createdAt

//   const memberSince = createdAt
//     ? new Date(createdAt).toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       })
//     : 'Not available'

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-100 px-4 pb-12 pt-24 sm:px-6">
//       {/* Background decorations */}
//       <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
//       <div className="pointer-events-none absolute -right-24 top-64 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
//       <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-100/60 blur-3xl" />

//       <div className="relative mx-auto max-w-3xl">
//         {/* Page heading */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-200/70">
//             <Heart className="h-7 w-7" />
//           </div>

//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
//             Your Profile
//             <span className="text-pink-500">.</span>
//           </h1>

//           <p className="mt-2 text-sm text-slate-500 sm:text-base">
//             A little space that's all about you.
//           </p>
//         </div>

//         {/* Main profile card */}
//         <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/75 shadow-2xl shadow-pink-200/40 backdrop-blur-xl">
//           {/* Gradient banner */}
//           <div className="relative h-32 overflow-hidden bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 sm:h-40">
//             <div className="absolute -right-5 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
//             <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-sm" />
//             <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
//               <Sparkles className="h-4 w-4" />
//               Your personal space
//             </div>
//           </div>

//           <div className="px-5 pb-7 sm:px-8">
//             {/* Avatar */}
//             <div className="-mt-16 flex flex-col items-center">
//               <div className="relative rounded-full bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 p-1.5 shadow-xl shadow-pink-200/70">
//                 <img
//                   src={profilePic}
//                   alt="Profile"
//                   className="h-32 w-32 rounded-full border-4 border-white bg-pink-50 object-cover sm:h-36 sm:w-36"
//                 />

//                 <label
//                   htmlFor="avatar-upload"
//                   title="Change profile photo"
//                   className={`absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-pink-300/70 ${
//                     isUpdatingProfile
//                       ? 'pointer-events-none animate-pulse opacity-70'
//                       : 'cursor-pointer'
//                   }`}
//                 >
//                   <Camera className="h-5 w-5" />

//                   <input
//                     type="file"
//                     id="avatar-upload"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     disabled={isUpdatingProfile}
//                   />
//                 </label>
//               </div>

//               <h2 className="mt-4 text-xl font-bold text-slate-800 sm:text-2xl">
//                 {fullName}
//               </h2>

//               <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
//                 <Mail className="h-4 w-4 text-pink-400" />
//                 <span className="break-all">{email}</span>
//               </div>

//               <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
//                 <CheckCircle2 className="h-4 w-4" />
//                 Account active
//               </div>

//               <p className="mt-3 text-center text-xs text-slate-400">
//                 {isUpdatingProfile
//                   ? 'Updating your photo...'
//                   : 'Tap the camera icon to change your profile photo'}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 JPG, PNG or WEBP · Maximum 5MB
//               </p>

//               {/* Upload feedback */}
//               {uploadError && (
//                 <p
//                   role="alert"
//                   className="mt-4 max-w-md rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-center text-sm text-rose-600"
//                 >
//                   {uploadError}
//                 </p>
//               )}

//               {uploadSuccess && (
//                 <p
//                   role="status"
//                   className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-600"
//                 >
//                   <CheckCircle2 className="h-4 w-4" />
//                   Profile photo updated successfully!
//                 </p>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="my-8 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

//             {/* Personal information */}
//             <div>
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
//                   <User className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-slate-800">
//                     Personal Information
//                   </h3>
//                   <p className="text-xs text-slate-400">
//                     Your account details
//                   </p>
//                 </div>
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50/80 p-4 transition-shadow hover:shadow-md hover:shadow-pink-100/60">
//                   <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
//                     <User className="h-4 w-4 text-pink-400" />
//                     Full Name
//                   </div>

//                   <p className="break-words font-semibold text-slate-700">
//                     {fullName}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/80 p-4 transition-shadow hover:shadow-md hover:shadow-purple-100/60">
//                   <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
//                     <Mail className="h-4 w-4 text-purple-400" />
//                     Email Address
//                   </div>

//                   <p className="break-words font-semibold text-slate-700">
//                     {email}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Account information */}
//             <div className="mt-8 rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/50 to-purple-50/70 p-5 sm:p-6">
//               <div className="mb-5 flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-md shadow-pink-200/60">
//                   <ShieldCheck className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-slate-800">
//                     Account Information
//                   </h3>
//                   <p className="text-xs text-slate-400">
//                     Your MilesTogether membership
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <div className="flex items-center justify-between gap-4 border-b border-pink-100 py-4">
//                   <div className="flex items-center gap-3 text-sm text-slate-500">
//                     <CalendarDays className="h-4 w-4 shrink-0 text-pink-400" />
//                     Member Since
//                   </div>

//                   <span className="text-right text-sm font-semibold text-slate-700">
//                     {memberSince}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-4 py-4">
//                   <div className="flex items-center gap-3 text-sm text-slate-500">
//                     <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
//                     Account Status
//                   </div>

//                   <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
//                     Active
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-6 flex items-center justify-center gap-2 text-xs text-pink-400">
//               <Heart className="h-3.5 w-3.5" />
//               Made for the moments that matter
//               <Heart className="h-3.5 w-3.5" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage



import { useState, useEffect } from 'react'
import {
  Camera,
  Mail,
  User,
  CalendarDays,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { useAuthStore } from '../../utils/useAuthStore'
import axiosInstance from '../../utils/axiosinstance'
import uploadImg from '../../utils/uploadImg'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const [selectedImg, setSelectedImg] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')

      if (response.data?.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])


  useEffect(() => {
    if (!selectedImg) return

    return () => {
      URL.revokeObjectURL(selectedImg)
    }
  }, [selectedImg])

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]

    e.target.value = ''

    if (!file) return

    setUploadError('')
    setUploadSuccess(false)

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Your image must be smaller than 5MB.')
      return
    }

    const previewUrl = URL.createObjectURL(file)
    setSelectedImg(previewUrl)

    try {
      const response = await uploadImg(file)

      const imageUrl =
        response?.data?.imageUrl ||
        response?.data?.secure_url ||
        response?.imageUrl ||
        response?.secure_url

      if (!imageUrl) {
        throw new Error(
          'The image was uploaded, but no image URL was returned.'
        )
      }

      await updateProfile({ profile: imageUrl })

      setUserInfo((prev) => ({
        ...(prev || authUser || {}),
        profilePic: imageUrl,
      }))

      setSelectedImg(null)
      setUploadSuccess(true)
    } catch (error) {
      console.error('Error updating profile:', error)

      setSelectedImg(null)
      setUploadError(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update your profile photo.'
      )
    }
  }

  const profilePic =
    selectedImg ||
    userInfo?.profilePic ||
    authUser?.profilePic ||
    '/avatar.png'

  const fullName = userInfo?.fullName || authUser?.fullName || 'Your Name'
  const email = userInfo?.email || authUser?.email || 'No email available'

  const createdAt = userInfo?.createdAt || authUser?.createdAt

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Not available'

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#160824] via-[#251034] to-[#10132f] px-4 pb-12 pt-24 text-white sm:px-6">
  
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-64 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl">
      
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 shadow-lg shadow-fuchsia-500/20">
            <Heart className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your Profile
            <span className="text-fuchsia-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-purple-200/60 sm:text-base">
            A little space that's all about you.
          </p>
        </div>

      
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#1c102b]/80 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        
          <div className="relative h-32 overflow-hidden bg-gradient-to-r from-fuchsia-700 via-purple-700 to-blue-700 sm:h-40">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-transparent to-blue-400/20" />
            <div className="absolute -right-5 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
            <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-fuchsia-300/10 blur-sm" />
            <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-orange-400/10 blur-2xl" />

            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:right-6 sm:top-6">
              <Sparkles className="h-4 w-4 text-orange-300" />
              Your personal space
            </div>
          </div>

          <div className="px-5 pb-7 sm:px-8">
        
            <div className="-mt-16 flex flex-col items-center">
              <div className="relative rounded-full bg-gradient-to-br from-fuchsia-400 via-purple-500 to-blue-400 p-1.5 shadow-xl shadow-fuchsia-500/25">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-[#1c102b] bg-[#281a38] object-cover sm:h-36 sm:w-36"
                />

                <label
                  htmlFor="avatar-upload"
                  title="Change profile photo"
                  className={`absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1c102b] bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-110 hover:shadow-fuchsia-500/50 ${
                    isUpdatingProfile
                      ? 'pointer-events-none animate-pulse opacity-70'
                      : 'cursor-pointer'
                  }`}
                >
                  <Camera className="h-5 w-5" />

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

              <h2 className="mt-4 break-words text-center text-xl font-bold text-white sm:text-2xl">
                {fullName}
              </h2>

              <div className="mt-2 flex max-w-full items-center gap-2 text-sm text-purple-200/60">
                <Mail className="h-4 w-4 shrink-0 text-fuchsia-400" />
                <span className="break-all">{email}</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Account active
              </div>

              <p className="mt-3 text-center text-xs text-purple-200/50">
                {isUpdatingProfile
                  ? 'Updating your photo...'
                  : 'Tap the camera icon to change your profile photo'}
              </p>

              <p className="mt-1 text-xs text-purple-200/40">
                JPG, PNG or WEBP · Maximum 5MB
              </p>

             
              {uploadError && (
                <p
                  role="alert"
                  className="mt-4 max-w-md rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300"
                >
                  {uploadError}
                </p>
              )}

              {uploadSuccess && (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Profile photo updated successfully!
                </p>
              )}
            </div>

          
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />

          
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Personal Information
                  </h3>
                  <p className="text-xs text-purple-200/50">
                    Your account details
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/[0.07] to-transparent p-4 transition-all hover:border-fuchsia-400/30 hover:shadow-lg hover:shadow-fuchsia-950/20">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-200/50">
                    <User className="h-4 w-4 text-fuchsia-400" />
                    Full Name
                  </div>

                  <p className="break-words font-semibold text-white">
                    {fullName}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.07] to-transparent p-4 transition-all hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-950/20">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-200/50">
                    <Mail className="h-4 w-4 text-blue-400" />
                    Email Address
                  </div>

                  <p className="break-words font-semibold text-white">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#281638]/80 via-[#20132f]/80 to-[#151a38]/80 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-600 text-white shadow-md shadow-fuchsia-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Account Information
                  </h3>
                  <p className="text-xs text-purple-200/50">
                    Your MilesCloser membership
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-4">
                  <div className="flex items-center gap-3 text-sm text-purple-200/60">
                    <CalendarDays className="h-4 w-4 shrink-0 text-fuchsia-400" />
                    Member Since
                  </div>

                  <span className="text-right text-sm font-semibold text-white">
                    {memberSince}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3 text-sm text-purple-200/60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    Account Status
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-fuchsia-300/70">
              <Heart className="h-3.5 w-3.5 fill-fuchsia-400/30" />
              Made for the moments that matter
              <Heart className="h-3.5 w-3.5 fill-fuchsia-400/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

