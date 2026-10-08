import { useState, type ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type TextInputProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  icon?: ReactNode
  autoComplete?: string
  error?: string
}

function TextInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon,
  autoComplete,
  error,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-lg border bg-white py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
            icon ? 'pl-10' : 'pl-3'
          } ${isPassword ? 'pr-10' : 'pr-3'} ${
            error ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default TextInput
