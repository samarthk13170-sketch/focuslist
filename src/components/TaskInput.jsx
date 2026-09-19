import { useState } from "react"
import { Plus } from "lucide-react"
import { PRIORITIES, PRIORITY_STYLES } from "../priorities.js"

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError(true)
      return
    }
    onAdd(trimmed, priority)
    setTitle("")
    setPriority("Medium")
    setError(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
    >
      <label htmlFor="task-title" className="mb-2 block text-sm font-medium text-slate-700">
        Add a task
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError(false)
          }}
          placeholder="What do you need to get done?"
          aria-invalid={error}
          className={`w-full flex-1 rounded-lg border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-brand-100"
          }`}
        />

        <div className="flex gap-2">
          <div className="relative">
            <label htmlFor="task-priority" className="sr-only">
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span
              className={`pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${PRIORITY_STYLES[priority].dot}`}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-rose-600">Please enter a task title.</p>}
    </form>
  )
}
