import { createContext, useContext } from 'react'
import type { Status, Task } from '../types'

export type NewTask = Omit<Task, 'id' | 'createdAt'>
export type TaskUpdates = Partial<Omit<Task, 'id' | 'createdAt'>>

export type TasksContextValue = {
  tasks: Task[]
  addTask: (task: NewTask) => void
  updateTask: (id: string, updates: TaskUpdates) => void
  updateTaskStatus: (id: string, status: Status) => void
  updateTaskDueDate: (id: string, dueDate: string) => void
  deleteTask: (id: string) => void
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined)

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}
