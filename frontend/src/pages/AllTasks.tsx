import { useState, type DragEvent } from 'react'
import { useOutletContext } from 'react-router-dom'
import KanbanColumn from '../components/KanbanColumn'
import { useTasks } from '../context/TasksContext'
import type { Status, TaskModalOutletContext } from '../types'

const COLUMNS: { status: Status; accent: string }[] = [
  { status: 'Not Started', accent: 'bg-gray-400' },
  { status: 'Ongoing', accent: 'bg-blue-500' },
  { status: 'Completed', accent: 'bg-green-500' },
]

function AllTasks() {
  const { tasks, updateTaskStatus, updateTaskDueDate, deleteTask } = useTasks()
  const { openEditTask } = useOutletContext<TaskModalOutletContext>()
  const [draggingId, setDraggingId] = useState<string | null>(null)

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
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">All Tasks</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Drag cards between columns to update their status.
          Double click a card to edit it
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            accent={column.accent}
            tasks={tasks.filter((task) => task.status === column.status)}
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
