import { Search, X } from "lucide-react"
import { PRIORITIES } from "../priorities.js"

const STATUS_FILTERS = ["All", "Active", "Completed"]

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition active:scale-[0.97] ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  )
}

export default function Filters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}) {
  return (
    <section aria-label="Search and filters" className="space-y-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title..."
          aria-label="Search tasks by title"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</span>
          {STATUS_FILTERS.map((s) => (
            <Pill key={s} active={status === s} onClick={() => onStatusChange(s)}>
              {s}
            </Pill>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Priority</span>
          <Pill active={priority === "All"} onClick={() => onPriorityChange("All")}>
            All
          </Pill>
          {PRIORITIES.map((p) => (
            <Pill key={p} active={priority === p} onClick={() => onPriorityChange(p)}>
              {p}
            </Pill>
          ))}
        </div>
      </div>
    </section>
  )
}
