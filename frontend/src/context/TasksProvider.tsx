import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { TasksContext, type NewTask, type TaskUpdates } from './TasksContext'
import { dummyTasks } from '../data/dummyTasks'
import type { Status, Task } from '../types'

let nextId = 100

function createId() {
  nextId += 1
  return `task-${nextId}`
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks)

  const addTask = useCallback((task: NewTask) => {
    setTasks((prev) => [
      { id: createId(), createdAt: new Date().toISOString(), ...task },
      ...prev,
    ])
  }, [])

  const updateTask = useCallback((id: string, updates: TaskUpdates) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }, [])

  const updateTaskStatus = useCallback((id: string, status: Status) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)))
  }, [])

  const updateTaskDueDate = useCallback((id: string, dueDate: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, dueDate } : task)))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, updateTaskStatus, updateTaskDueDate, deleteTask }),
    [tasks, addTask, updateTask, updateTaskStatus, updateTaskDueDate, deleteTask],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
