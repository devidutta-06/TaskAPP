import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  Clock,
  CloudSun,
  LogOut,
  Menu,
  Moon,
  Sun,
  Sunset,
  type LucideIcon,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

type NavbarProps = {
  userName?: string
  onToggleSidebar?: () => void
}

function getGreeting(hour: number): { text: string; icon: LucideIcon; color: string } {
  if (hour >= 5 && hour < 12) return { text: 'Good morning', icon: Sun, color: 'text-amber-500' }
  if (hour >= 12 && hour < 17) return { text: 'Good afternoon', icon: CloudSun, color: 'text-sky-500' }
  return { text: 'Good evening', icon: Sunset, color: 'text-orange-500' }
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
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [now, setNow] = useState(() => new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [menuOpen])

  const { day, time } = formatDateTime(now)
  const { text: greeting, icon: GreetingIcon, color: greetingColor } = getGreeting(now.getHours())
  const initial = userName.charAt(0).toUpperCase()
  const isDark = theme === 'dark'
  const email = `${userName.toLowerCase()}@taskapp.com`

  const handleLogout = () => {
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <GreetingIcon className={`h-5 w-5 shrink-0 ${greetingColor}`} />
        <h1 className="truncate text-base font-semibold text-gray-900 dark:text-slate-100 sm:text-lg">
          {greeting}, {userName}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:flex">
          <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>{day}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="tabular-nums">{time}</span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open profile menu"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:bg-blue-500"
          >
            {initial}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-slate-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white dark:bg-blue-500">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-slate-400">{email}</p>
                </div>
              </div>

              <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={isDark}
                onClick={toggleTheme}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-700/60"
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  Dark mode
                </span>
                <span
                  className={`relative h-5 w-9 rounded-full transition ${
                    isDark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      isDark ? 'left-4' : 'left-0.5'
                    }`}
                  />
                </span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
