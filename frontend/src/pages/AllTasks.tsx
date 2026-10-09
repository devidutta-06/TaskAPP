import { useState, type DragEvent } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { ChevronDown, Filter } from 'lucide-react'
import KanbanColumn from '../components/KanbanColumn'
import { useTasks } from '../context/TasksContext'
import { isOverdue } from '../utils/date'
import type { Status, Task, TaskModalOutletContext } from '../types'

const COLUMNS: { status: Status; accent: string }[] = [
  { status: 'Not Started', accent: 'bg-gray-400' },
  { status: 'Ongoing', accent: 'bg-blue-500' },
  { status: 'Completed', accent: 'bg-green-500' },
]

type FilterKey = 'overdue' | 'ongoing' | 'completed'

function matchesFilter(task: Task, filter: FilterKey) {
  if (filter === 'overdue') return task.status !== 'Completed' && isOverdue(task.dueDate)
  if (filter === 'ongoing') return task.status === 'Ongoing'
  return task.status === 'Completed'
}

function AllTasks() {
  const { tasks, updateTaskStatus, updateTaskDueDate, deleteTask } = useTasks()
  const { openEditTask } = useOutletContext<TaskModalOutletContext>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const rawFilter = searchParams.get('filter')
  const filter: FilterKey | null =
    rawFilter === 'overdue' || rawFilter === 'ongoing' || rawFilter === 'completed'
      ? rawFilter
      : null

  const visibleTasks = filter ? tasks.filter((task) => matchesFilter(task, filter)) : tasks

  const handleFilterChange = (value: string) => {
    if (value === 'all') setSearchParams({})
    else setSearchParams({ filter: value })
  }

  const handleDragStart = (id: string, event: DragEvent<HTMLDivElement>) => {
    setDraggingId(id)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
  }

  const handleDrop = (status: Status) => {
    if (draggingId) updateTaskStatus(draggingId, status)
    setDraggingId(null)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">All Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Drag cards between columns to update their status.
            Double click a card to edit it
          </p>
        </div>

        <div className="relative shrink-0">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <select
            value={filter ?? 'all'}
            onChange={(event) => handleFilterChange(event.target.value)}
            aria-label="Filter tasks"
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:w-44"
          >
            <option value="all">All</option>
            <option value="overdue">Overdue</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            accent={column.accent}
            tasks={visibleTasks.filter((task) => task.status === column.status)}
            draggingId={draggingId}
            onDragStartTask={handleDragStart}
            onDragEndTask={() => setDraggingId(null)}
            onDropTask={handleDrop}
            onStatusChange={updateTaskStatus}
            onDueDateChange={updateTaskDueDate}
            onEditTask={openEditTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default AllTasks
