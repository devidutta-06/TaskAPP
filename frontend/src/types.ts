export type Priority = 'Low' | 'Medium' | 'High'
export type Status = 'Not Started' | 'Ongoing' | 'Completed'

export const PRIORITIES: Priority[] = ['Low', 'Medium', 'High']
export const STATUSES: Status[] = ['Not Started', 'Ongoing', 'Completed']

export type Task = {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  dueDate: string
  createdAt: string
}

export type TaskModalOutletContext = {
  openEditTask: (task: Task) => void
  openCreateTask: (dueDate?: string) => void
}
