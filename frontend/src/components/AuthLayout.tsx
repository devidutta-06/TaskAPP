import type { ReactNode } from 'react'
import { CalendarClock, CheckCircle2, Cloud, ListChecks } from 'lucide-react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

const FEATURES = [
  { icon: CheckCircle2, text: 'Organize every task in one clean workspace' },
  { icon: CalendarClock, text: 'Never miss a deadline with smart reminders' },
  { icon: Cloud, text: 'Your tasks, synced across all your devices' },
]

function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-blue-400/20" />

        <div className="relative flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-700">
            <ListChecks className="h-5 w-5" />
          </span>
          <span className="text-xl font-semibold">TaskApp</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-snug">
            Plan your day. Track your tasks. Get things done.
          </h2>
          <p className="mt-3 text-blue-100">
            The simple way to stay organized and focused on what matters most.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm text-blue-50">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-blue-200">
          © 2026 TaskApp. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col px-6 py-8 sm:px-10 lg:justify-center lg:px-16">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ListChecks className="h-5 w-5" />
          </span>
          <span className="text-xl font-semibold text-gray-900">TaskApp</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
