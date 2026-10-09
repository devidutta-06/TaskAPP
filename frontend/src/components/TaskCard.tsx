import type { DragEvent } from 'react'
import { CalendarDays, Trash2 } from 'lucide-react'
import type { Priority, Status, Task } from '../types'
import { STATUSES } from '../types'
import { formatDate, isOverdue, isToday, todayISO } from '../utils/date'

const PRIORITY_STYLES: Record<Priority, string> = {
  Low: 'border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400',
  Medium:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400',
  High: 'border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400',
}

const STATUS_STYLES: Record<Status, string> = {
  'Not Started':
    'border-gray-200 bg-gray-100 text-gray-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300',
  Ongoing:
    'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400',
  Completed:
    'border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400',
}

type TaskCardProps = {
  task: Task
  draggable?: boolean
  dragging?: boolean
  onDragStart?: (event: DragEvent<HTMLDivElement>) => void
  onDragEnd?: (event: DragEvent<HTMLDivElement>) => void
  onStatusChange?: (status: Status) => void
  onDueDateChange?: (dueDate: string) => void
  onEdit?: () => void
  onDelete?: () => void
}

function TaskCard({
  task,
  draggable = false,
  dragging = false,
  onDragStart,
  onDragEnd,
  onStatusChange,
  onDueDateChange,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const overdue = task.status !== 'Completed' && isOverdue(task.dueDate)

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={onEdit}
      className={`group flex flex-col rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl transition dark:border-slate-700/70 dark:bg-slate-800/70 dark:ring-white/10 ${
        draggable ? 'cursor-grab active:cursor-grabbing' : onEdit ? 'cursor-pointer' : ''
      } ${
        dragging
          ? 'opacity-50 ring-2 ring-blue-400'
          : 'hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_18px_40px_-10px_rgba(15,23,42,0.35)] dark:hover:bg-slate-800/90'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
        >
          {task.priority}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete task"
            className="rounded-md p-1 text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <h3 className="mt-3 truncate text-sm font-semibold text-gray-900 dark:text-slate-100">
        {task.title}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-[2rem] text-xs text-gray-500 dark:text-slate-400">
        {task.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <div
          className={`relative inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs ${
            overdue
              ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400'
              : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300'
          }`}
        >
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{isToday(task.dueDate) ? 'Today' : formatDate(task.dueDate)}</span>
          {onDueDateChange && (
            <input
              type="date"
              value={task.dueDate}
              min={todayISO()}
              onChange={(event) => onDueDateChange(event.target.value)}
              aria-label="Change due date"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          )}
        </div>

        {onStatusChange ? (
          <select
            value={task.status}
            onChange={(event) => onStatusChange(event.target.value as Status)}
            aria-label="Change status"
            className={`cursor-pointer rounded-md border px-2 py-1 text-xs font-medium outline-none focus:border-blue-500 ${STATUS_STYLES[task.status]}`}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${STATUS_STYLES[task.status]}`}
          >
            {task.status}
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskCard
