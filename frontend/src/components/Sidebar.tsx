import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  LogOut,
  Settings,
  X,
} from 'lucide-react'

export type NavKey = 'dashboard' | 'all-tasks' | 'today-tasks' | 'calendar'

type NavItem = {
  key: NavKey
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'all-tasks', label: 'All Tasks', icon: ClipboardList },
  { key: 'today-tasks', label: "Today's Tasks", icon: ListChecks },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
]

type SidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
  open?: boolean
  onClose?: () => void
}

function Sidebar({ active, onNavigate, open = false, onClose }: SidebarProps) {
  const renderItems = (isMobile: boolean) =>
    NAV_ITEMS.map(({ key, label, icon: Icon }) => {
      const isActive = key === active
      return (
        <button
          key={key}
          type="button"
          onClick={() => {
            onNavigate(key)
            if (isMobile) onClose?.()
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
          {label}
        </button>
      )
    })

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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
              <ListChecks className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-gray-900">TaskApp</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Menu
          </p>
          {renderItems(false)}
        </nav>

        <div className="space-y-1 border-t border-gray-200 px-3 py-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Settings className="h-5 w-5 text-gray-400" />
            Settings
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 text-gray-400" />
            Logout
          </button>
        </div>
      </aside>

    </>
  )
}

export default Sidebar
