import { useEffect, useMemo, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import Stats from "./components/Stats.jsx"
import TaskInput from "./components/TaskInput.jsx"
import Filters from "./components/Filters.jsx"
import TaskList from "./components/TaskList.jsx"
import { PRIORITY_ORDER } from "./priorities.js"

const STORAGE_KEY = "focuslist.tasks.v1"

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Ignore write errors (e.g. storage disabled/full).
    }
  }, [tasks])

  function addTask(title, taskPriority) {
    const newTask = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + Math.random().toString(16).slice(2),
      title,
      priority: taskPriority,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function editTask(id, updates) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return { total, completed, pending: total - completed }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tasks
      .filter((t) => {
        if (status === "Active" && t.completed) return false
        if (status === "Completed" && !t.completed) return false
        if (priority !== "All" && t.priority !== priority) return false
        if (query && !t.title.toLowerCase().includes(query)) return false
        return true
      })
      .sort((a, b) => {
        // Active tasks first, then by priority, then newest first.
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        if (p !== 0) return p
        return b.createdAt - a.createdAt
      })
  }, [tasks, search, status, priority])

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 sm:py-12">
      <header className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">FocusList</h1>
          <p className="text-sm text-slate-500">Prioritize what matters, get it done.</p>
        </div>
      </header>

      <main className="space-y-6">
        <Stats total={stats.total} completed={stats.completed} pending={stats.pending} />

        <TaskInput onAdd={addTask} />

        <Filters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          isEmptyState={tasks.length === 0}
        />
      </main>

      <footer className="mt-10 text-center text-xs text-slate-400">
        Your tasks are saved locally in this browser.
      </footer>
    </div>
  )
}
