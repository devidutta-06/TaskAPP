import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskModal from '../components/TaskModal'
import { useTasks } from '../context/TasksContext'
import { isOverdue, isToday, toISODate } from '../utils/date'
import type { Task, TaskModalOutletContext } from '../types'

const DEMO_WEEKLY_ACTIVITY = [2, 4, 3, 6, 1, 5, 3]

const cardClass =
  'rounded-2xl border border-white/60 bg-white/70 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:ring-white/10'

const toneClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 42
  const stroke = 8
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-blue-600 transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-gray-900 dark:text-slate-100">{percent}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">
          done
        </span>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  onClick,
}: {
  label: string
  value: number
  hint: string
  icon: LucideIcon
  tone: keyof typeof toneClasses
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cardClass} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
          {label}
        </span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-gray-900 dark:text-slate-100">{value}</p>
      <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">{hint}</p>
    </button>
  )
}

function Overview() {
  const { tasks } = useTasks()
  const navigate = useNavigate()

  const todayTasks = tasks.filter((task) => isToday(task.dueDate))
  const todayTotal = todayTasks.length
  const todayCompleted = todayTasks.filter((task) => task.status === 'Completed').length
  const todayLeft = todayTotal - todayCompleted
  const percent = todayTotal ? Math.round((todayCompleted / todayTotal) * 100) : 0

  const overdue = tasks.filter(
    (task) => task.status !== 'Completed' && isOverdue(task.dueDate),
  ).length
  const ongoing = tasks.filter((task) => task.status === 'Ongoing').length
  const completed = tasks.filter((task) => task.status === 'Completed').length

  const weeklyData = DEMO_WEEKLY_ACTIVITY.map((value, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (DEMO_WEEKLY_ACTIVITY.length - 1 - index))
    return {
      iso: toISODate(date),
      label: date.toLocaleDateString('en-US', { weekday: 'narrow' }),
      value,
      isToday: index === DEMO_WEEKLY_ACTIVITY.length - 1,
    }
  })
  const maxActivity = Math.max(...weeklyData.map((day) => day.value), 1)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">Here&apos;s your overview for today.</p>
      </div>

      <button
        type="button"
        onClick={() => navigate('/dashboard/today-tasks')}
        className={`${cardClass} w-full p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:p-6`}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Today&apos;s Progress
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-slate-100">
              {todayCompleted} of {todayTotal} tasks
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {todayLeft} {todayLeft === 1 ? 'task' : 'tasks'} left to complete
            </p>
            <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Keep your momentum
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500">One task at a time.</p>
            </div>
          </div>
          <ProgressRing percent={percent} />
        </div>
      </button>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="All Tasks"
          value={tasks.length}
          hint="Across all statuses"
          icon={ListTodo}
          tone="blue"
          onClick={() => navigate('/dashboard/all-tasks')}
        />
        <StatCard
          label="Overdue"
          value={overdue}
          hint="Need your attention"
          icon={AlertTriangle}
          tone="red"
          onClick={() => navigate('/dashboard/all-tasks?filter=overdue')}
        />
        <StatCard
          label="Ongoing"
          value={ongoing}
          hint="Currently in progress"
          icon={Clock}
          tone="amber"
          onClick={() => navigate('/dashboard/all-tasks?filter=ongoing')}
        />
        <StatCard
          label="Completed"
          value={completed}
          hint="Tasks finished"
          icon={CheckCircle2}
          tone="emerald"
          onClick={() => navigate('/dashboard/all-tasks?filter=completed')}
        />
      </section>

      <section className={`${cardClass} p-5 sm:p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100">
              Weekly activity
            </h2>
          </div>
          <span className="text-xs font-medium text-gray-400 dark:text-slate-500">Last 7 days</span>
        </div>

        <div className="mt-5 flex items-end gap-2 sm:gap-3">
          {weeklyData.map((day) => (
            <div key={day.iso} className="group flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    day.isToday
                      ? 'bg-blue-600'
                      : 'bg-blue-500/30 group-hover:bg-blue-500/50 dark:bg-blue-400/25 dark:group-hover:bg-blue-400/40'
                  }`}
                  style={{ height: `${Math.max((day.value / maxActivity) * 100, 6)}%` }}
                  title={`${day.value} completed`}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  day.isToday
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-slate-500'
                }`}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-400 dark:text-slate-500">
          Illustrative data — represents tasks completed per day.
        </p>
      </section>
    </div>
  )
}

function Dashboard() {
  const location = useLocation()
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
  const isOverview = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 text-gray-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          userName="Devi"
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <main className="flex-1 p-4 sm:p-6">
          {isOverview ? <Overview /> : <Outlet context={modalContext} />}
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
