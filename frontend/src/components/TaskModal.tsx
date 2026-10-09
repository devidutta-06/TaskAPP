import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { useTasks } from '../context/TasksContext'
import { PRIORITIES, STATUSES, type Priority, type Status, type Task } from '../types'
import { todayISO } from '../utils/date'

type TaskModalProps = {
  task?: Task
  onClose: () => void
}

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'
const fieldClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'

function TaskModal({ task, onClose }: TaskModalProps) {
  const { addTask, updateTask } = useTasks()
  const isEdit = Boolean(task)

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium')
  const [status, setStatus] = useState<Status>(task?.status ?? 'Not Started')
  const [dueDate, setDueDate] = useState(task?.dueDate ?? todayISO())
  const [error, setError] = useState<string>()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
    }

    if (task) {
      updateTask(task.id, payload)
    } else {
      addTask(payload)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/60 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <div>
            <label htmlFor="title" className={labelClass}>
              Task title
            </label>
            <input
              id="title"
              autoFocus
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                if (error) setError(undefined)
              }}
              placeholder="e.g. Prepare weekly report"
              className={fieldClass}
            />
            {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more details about this task..."
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className={labelClass}>
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
                className={fieldClass}
              >
                {PRIORITIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
                className={fieldClass}
              >
                {STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className={labelClass}>
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              min={todayISO()}
              onChange={(event) => setDueDate(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
