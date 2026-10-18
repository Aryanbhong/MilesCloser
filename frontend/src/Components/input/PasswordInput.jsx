
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { MdLockOutline } from 'react-icons/md'

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const setPasswordToggle = () => {
    setIsShowPassword((prev) => !prev)
  }

  return (
    <div className="group relative mb-4">
      {/* Neon focus glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 opacity-0 blur transition duration-300 group-focus-within:opacity-40" />

      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1c102b]/90 px-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 focus-within:border-fuchsia-400/40 focus-within:bg-[#241333]">
        {/* Lock icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-500/15 to-blue-500/15 text-fuchsia-400 transition-transform duration-300 group-focus-within:scale-105 group-focus-within:text-blue-300">
          <MdLockOutline className="text-xl" />
        </div>

        {/* Password input */}
        <input
          type={isShowPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder || 'Enter your password'}
          autoComplete="current-password"
          className="w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-purple-200/40"
        />

        {/* Show/hide password */}
        <button
          type="button"
          onClick={setPasswordToggle}
          aria-label={isShowPassword ? 'Hide password' : 'Show password'}
          aria-pressed={isShowPassword}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-purple-200/50 transition-all duration-200 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 active:scale-95"
        >
          {isShowPassword ? (
            <FaRegEye className="text-lg" />
          ) : (
            <FaRegEyeSlash className="text-lg" />
          )}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
