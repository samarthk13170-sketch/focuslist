import { ListTodo, CheckCircle2, Circle } from "lucide-react"

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold leading-none text-slate-900">{value}</p>
        <p className="mt-1 truncate text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default function Stats({ total, completed, pending }) {
  return (
    <section aria-label="Task statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard icon={ListTodo} label="Total tasks" value={total} accent="bg-brand-50 text-brand-600" />
      <StatCard icon={Circle} label="Pending" value={pending} accent="bg-amber-50 text-amber-600" />
      <StatCard icon={CheckCircle2} label="Completed" value={completed} accent="bg-emerald-50 text-emerald-600" />
    </section>
  )
}
