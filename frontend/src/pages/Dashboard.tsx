import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar, { type NavKey } from '../components/Sidebar'

const PAGE_TITLES: Record<NavKey, string> = {
  dashboard: 'Dashboard',
  'all-tasks': 'All Tasks',
  'today-tasks': "Today's Tasks",
  calendar: 'Calendar',
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [active, setActive] = useState<NavKey>('dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar
        active={active}
        onNavigate={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          userName="Devi"
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-xl font-semibold text-gray-900">
            {PAGE_TITLES[active]}
          </h1>
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            {PAGE_TITLES[active]} content goes here
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
