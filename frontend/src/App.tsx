import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar, { type NavKey } from './components/Sidebar'

function App() {
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
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            {active} page content goes here
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
