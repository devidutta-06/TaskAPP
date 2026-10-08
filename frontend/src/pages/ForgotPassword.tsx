import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import TextInput from '../components/TextInput'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email')
      return
    }
    setError(undefined)
    setSent(true)
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-base font-semibold text-gray-900">Check your email</h2>
          <p className="mt-1.5 text-sm text-gray-600">
            We&apos;ve sent a password reset link to{' '}
            <span className="font-medium text-gray-900">{email}</span>.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Resend link
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <TextInput
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            icon={<Mail className="h-4 w-4" />}
            error={error}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ForgotPassword
