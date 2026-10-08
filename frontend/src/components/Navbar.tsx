import { useEffect, useState } from 'react'
import { Bell, CalendarDays, Clock, Menu, Search } from 'lucide-react'

type NavbarProps = {
  userName?: string
  onToggleSidebar?: () => void
}

function formatDateTime(date: Date) {
  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return { day, time }
}

function Navbar({ userName = 'User', onToggleSidebar }: NavbarProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { day, time } = formatDateTime(now)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <p className="truncate text-sm text-gray-500">Welcome back</p>
        <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
          Hi, {userName}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 md:flex">
          <CalendarDays className="h-4 w-4 text-indigo-500" />
          <span>{day}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700">
          <Clock className="h-4 w-4 text-indigo-500" />
          <span className="tabular-nums">{time}</span>
        </div>

        <button
          type="button"
          aria-label="Search"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:inline-flex"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}

export default Navbar
