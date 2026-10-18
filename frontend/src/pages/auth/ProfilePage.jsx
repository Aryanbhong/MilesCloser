
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

