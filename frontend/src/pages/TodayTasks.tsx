import { CalendarCheck } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import TaskCard from '../components/TaskCard'
import { useTasks } from '../context/TasksContext'
import type { TaskModalOutletContext } from '../types'
import { isToday } from '../utils/date'

function TodayTasks() {
  const { tasks, updateTaskStatus, updateTaskDueDate, deleteTask } = useTasks()
  const { openEditTask } = useOutletContext<TaskModalOutletContext>()
  const todaysTasks = tasks.filter((task) => isToday(task.dueDate))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Today's Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Everything you need to do today.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          {todaysTasks.length} {todaysTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {todaysTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-slate-600 dark:bg-slate-800/60">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <CalendarCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-sm font-semibold text-gray-900 dark:text-slate-100">
            Nothing due today
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            You're all caught up. Enjoy the rest of your day.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todaysTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={(status) => updateTaskStatus(task.id, status)}
              onDueDateChange={(dueDate) => updateTaskDueDate(task.id, dueDate)}
              onEdit={() => openEditTask(task)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TodayTasks
