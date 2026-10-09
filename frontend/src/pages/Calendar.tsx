import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTasks } from '../context/TasksContext'
import type { Priority, Task, TaskModalOutletContext } from '../types'
import { toISODate, todayISO } from '../utils/date'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MAX_CHIPS = 3

const PRIORITY_DOT: Record<Priority, string> = {
  High: 'bg-red-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500',
}

type Cell = {
  iso: string
  day: number
  inMonth: boolean
}

function Calendar() {
  const { tasks } = useTasks()
  const { openEditTask, openCreateTask } = useOutletContext<TaskModalOutletContext>()
  const today = todayISO()

  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>()
    for (const task of tasks) {
      const list = map.get(task.dueDate)
      if (list) list.push(task)
      else map.set(task.dueDate, [task])
    }
    return map
  }, [tasks])

  const cells = useMemo<Cell[]>(() => {
    const firstWeekday = new Date(year, month, 1).getDay()
    const start = new Date(year, month, 1 - firstWeekday)
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
      return { iso: toISODate(date), day: date.getDate(), inMonth: date.getMonth() === month }
    })
  }, [year, month])

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const goToMonth = (offset: number) => setViewDate(new Date(year, month + offset, 1))

  const goToToday = () => {
    const now = new Date()
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1))
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Calendar</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Plan your work by due date. Click a day to add a task.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToToday}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Today
          </button>
          <div className="flex items-center rounded-lg border border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              aria-label="Previous month"
              className="p-2 text-gray-500 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[9rem] px-2 text-center text-sm font-semibold text-gray-900 dark:text-slate-100">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              aria-label="Next month"
              className="p-2 text-gray-500 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:ring-white/10">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700">
          {cells.map((cell) => {
            const dayTasks = tasksByDate.get(cell.iso) ?? []
            const isTodayCell = cell.iso === today

            return (
              <div
                key={cell.iso}
                onClick={() => openCreateTask(cell.iso)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openCreateTask(cell.iso)
                  }
                }}
                className={`group min-h-[72px] cursor-pointer p-1.5 text-left transition sm:min-h-[104px] ${
                  cell.inMonth
                    ? 'bg-white/70 hover:bg-blue-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-700/70'
                    : 'bg-slate-50/60 hover:bg-slate-100/70 dark:bg-slate-900/50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isTodayCell
                        ? 'bg-blue-600 text-white'
                        : cell.inMonth
                          ? 'text-gray-700 dark:text-slate-200'
                          : 'text-gray-300 dark:text-slate-600'
                    }`}
                  >
                    {cell.day}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="rounded-full bg-blue-50 px-1.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  {dayTasks.slice(0, MAX_CHIPS).map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openEditTask(task)
                      }}
                      title={task.title}
                      className={`flex w-full items-center gap-1.5 rounded-md bg-white/90 px-1.5 py-1 text-left text-[11px] font-medium text-gray-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-700/90 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 ${
                        task.status === 'Completed' ? 'opacity-60 line-through' : ''
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${PRIORITY_DOT[task.priority]}`}
                      />
                      <span className="truncate">{task.title}</span>
                    </button>
                  ))}

                  {dayTasks.length > MAX_CHIPS && (
                    <p className="px-1 text-[10px] font-medium text-gray-400 dark:text-slate-500">
                      +{dayTasks.length - MAX_CHIPS} more
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
        <span className="font-medium text-gray-600 dark:text-slate-300">Priority:</span>
        {(Object.keys(PRIORITY_DOT) as Priority[]).map((priority) => (
          <span key={priority} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT[priority]}`} />
            {priority}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Calendar
