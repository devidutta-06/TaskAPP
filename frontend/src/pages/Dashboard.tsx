import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskModal from '../components/TaskModal'
import type { Task, TaskModalOutletContext } from '../types'

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task>()
  const [draftDueDate, setDraftDueDate] = useState<string>()

  const openCreateTask = (dueDate?: string) => {
    setEditingTask(undefined)
    setDraftDueDate(dueDate)
    setModalOpen(true)
  }

  const openEditTask = (task: Task) => {
    setEditingTask(task)
    setDraftDueDate(undefined)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(undefined)
    setDraftDueDate(undefined)
  }

  const modalContext: TaskModalOutletContext = { openEditTask, openCreateTask }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 text-gray-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          userName="Devi"
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet context={modalContext} />
        </main>
      </div>

      <button
        type="button"
        onClick={() => openCreateTask()}
        aria-label="Create task"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
      >
        <Plus className="h-6 w-6" />
      </button>

      {modalOpen && (
        <TaskModal task={editingTask} defaultDueDate={draftDueDate} onClose={closeModal} />
      )}
    </div>
  )
}

export default Dashboard
