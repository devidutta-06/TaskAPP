import { useState, type DragEvent } from 'react'
import TaskCard from './TaskCard'
import type { Status, Task } from '../types'

type KanbanColumnProps = {
  status: Status
  accent: string
  tasks: Task[]
  draggingId: string | null
  onDragStartTask: (id: string, event: DragEvent<HTMLDivElement>) => void
  onDragEndTask: () => void
  onDropTask: (status: Status) => void
  onStatusChange: (id: string, status: Status) => void
  onDueDateChange: (id: string, dueDate: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

function KanbanColumn({
  status,
  accent,
  tasks,
  draggingId,
  onDragStartTask,
  onDragEndTask,
  onDropTask,
  onStatusChange,
  onDueDateChange,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false)

  return (
    <section
      onDragOver={(event) => {
        event.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(event) => {
        event.preventDefault()
        setIsOver(false)
        onDropTask(status)
      }}
      className={`flex flex-col rounded-2xl border border-white/60 bg-white/40 p-3 backdrop-blur-md transition ${
        isOver ? 'border-blue-400 ring-2 ring-blue-200' : ''
      }`}
    >
      <header className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
          <h2 className="text-sm font-semibold text-gray-700">{status}</h2>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500">
          {tasks.length}
        </span>
      </header>

      <div className="flex min-h-[140px] flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            draggable
            dragging={draggingId === task.id}
            onDragStart={(event) => onDragStartTask(task.id, event)}
            onDragEnd={onDragEndTask}
            onStatusChange={(nextStatus) => onStatusChange(task.id, nextStatus)}
            onDueDateChange={(dueDate) => onDueDateChange(task.id, dueDate)}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="rounded-lg border border-dashed border-gray-300 px-1 py-6 text-center text-xs text-gray-400">
            Drop tasks here
          </p>
        )}
      </div>
    </section>
  )
}

export default KanbanColumn
