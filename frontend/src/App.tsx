import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TasksProvider } from './context/TasksProvider'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import AllTasks from './pages/AllTasks'
import TodayTasks from './pages/TodayTasks'
import Calendar from './pages/Calendar'

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="today-tasks" element={<TodayTasks />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  )
}

export default App
