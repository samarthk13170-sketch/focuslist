export const PRIORITIES = ["High", "Medium", "Low"]

export const PRIORITY_STYLES = {
  High: {
    badge: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
  },
  Medium: {
    badge: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  Low: {
    badge: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
}

// Used to sort tasks so higher priority surfaces first.
export const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 }
