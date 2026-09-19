import { useState } from "react"
import { Check, Pencil, Trash2, X, ClipboardList } from "lucide-react"
import { PRIORITIES, PRIORITY_STYLES } from "../priorities.js"

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)
  const [draftPriority, setDraftPriority] = useState(task.priority)

  const styles = PRIORITY_STYLES[task.priority]

  function startEdit() {
    setDraftTitle(task.title)
    setDraftPriority(task.priority)
    setEditing(true)
  }

  function saveEdit() {
    const trimmed = draftTitle.trim()
    if (!trimmed) return
    onEdit(task.id, { title: trimmed, priority: draftPriority })
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="animate-pop rounded-xl bg-white p-3 shadow-sm ring-1 ring-brand-200">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              if (e.key === "Enter") saveEdit()
              if (e.key === "Escape") setEditing(false)
            }}
            aria-label="Edit task title"
            className="w-full flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
          <div className="flex gap-2">
            <select
              value={draftPriority}
              onChange={(e) => setDraftPriority(e.target.value)}
              aria-label="Edit task priority"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={saveEdit}
              aria-label="Save changes"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-white transition hover:bg-brand-700 active:scale-95"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              aria-label="Cancel editing"
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className="group animate-pop flex items-start gap-3 overflow-hidden rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-slate-100 transition hover:ring-slate-200">
      <span className={`mt-0.5 h-9 w-1 shrink-0 self-stretch rounded-full ${styles.bar}`} aria-hidden="true" />

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition active:scale-90 ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white hover:border-brand-500"
        }`}
      >
        {task.completed && <Check className="h-3.5 w-3.5" />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm font-medium transition ${
            task.completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.title}
        </p>
        <span
          className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${styles.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
          {task.priority}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
        <button
          type="button"
          onClick={startEdit}
          aria-label="Edit task"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-600 active:scale-90"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 active:scale-90"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit, isEmptyState }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-14 text-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
          <ClipboardList className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-sm font-semibold text-slate-700">
          {isEmptyState ? "No tasks yet" : "No matching tasks"}
        </p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          {isEmptyState
            ? "Add your first task above to start staying focused."
            : "Try adjusting your search or filters to find what you're looking for."}
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-2.5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
