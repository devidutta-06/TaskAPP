import { NavLink, useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  LogOut,
  X,
} from 'lucide-react'

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/all-tasks', label: 'All Tasks', icon: ClipboardList },
  { to: '/dashboard/today-tasks', label: "Today's Tasks", icon: ListChecks },
  { to: '/dashboard/calendar', label: 'Calendar', icon: CalendarDays },
]

type SidebarProps = {
  open?: boolean
  onClose?: () => void
}

function Sidebar({ open = false, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const renderItems = () =>
    NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        onClick={() => onClose?.()}
        className={({ isActive }) =>
          `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`h-5 w-5 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'
              }`}
            />
            {label}
          </>
        )}
      </NavLink>
    ))

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ListChecks className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">TaskApp</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
            Menu
          </p>
          {renderItems()}
        </nav>

        <div className="space-y-1 border-t border-gray-200 px-3 py-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onClose?.()
              navigate('/login')
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <LogOut className="h-5 w-5 text-gray-400 dark:text-slate-500" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
