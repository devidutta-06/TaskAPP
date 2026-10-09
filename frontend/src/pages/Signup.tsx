import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'
import googleLogo from '../assets/google-logo.svg'

type FormErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: FormErrors = {}
    if (!name.trim()) nextErrors.name = 'Name is required'
    if (!email.trim()) nextErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email'
    if (!password) nextErrors.password = 'Password is required'
    else if (password.length < 8) nextErrors.password = 'At least 8 characters'
    if (!confirmPassword) nextErrors.confirmPassword = 'Please confirm your password'
    else if (confirmPassword !== password) nextErrors.confirmPassword = 'Passwords do not match'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your tasks in seconds."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <TextInput
          label="Full name"
          name="name"
          value={name}
          onChange={setName}
          placeholder="John Doe"
          autoComplete="name"
          icon={<User className="h-4 w-4" />}
          error={errors.name}
        />

        <TextInput
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email}
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password}
        />

        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Create account
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">
          or sign up with
        </span>
        <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
      </div>

      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <img src={googleLogo} alt="" aria-hidden="true" className="h-4 w-4" />
        Sign up with Google
      </button>
    </AuthLayout>
  )
}

export default Signup
