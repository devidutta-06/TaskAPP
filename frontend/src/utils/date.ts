function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDaysISO(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function formatDate(iso: string) {
  if (!iso) return 'No due date'
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isToday(iso: string) {
  return iso === todayISO()
}

export function isOverdue(iso: string) {
  return iso !== '' && iso < todayISO()
}
