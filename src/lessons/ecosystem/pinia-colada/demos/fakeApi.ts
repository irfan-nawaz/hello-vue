import { reactive } from 'vue'

export interface Todo {
  id: number
  title: string
  done: boolean
}

// A fake backend living in memory, with knobs for latency and failures
export const server = reactive({ latency: 700, failRate: 0, calls: 0 })
const db: Todo[] = [
  { id: 1, title: 'Learn useQuery', done: true },
  { id: 2, title: 'Learn useMutation', done: false },
  { id: 3, title: 'Invalidate the cache', done: false },
]

function respond<T>(make: () => T) {
  server.calls++
  return new Promise<T>((resolve, reject) =>
    setTimeout(() => (Math.random() < server.failRate ? reject(new Error('500 Internal Server Error')) : resolve(make())), server.latency),
  )
}

export const api = {
  todos: () => respond(() => db.map((t) => ({ ...t }))),
  todo: (id: number) =>
    respond(() => {
      const t = db.find((x) => x.id === id)
      if (!t) throw new Error('404')
      return { ...t, fetchedAt: new Date().toLocaleTimeString() }
    }),
  add: (title: string) =>
    respond(() => {
      const t = { id: Math.max(0, ...db.map((x) => x.id)) + 1, title, done: false }
      db.push(t)
      return t
    }),
  toggle: (id: number) =>
    respond(() => {
      const t = db.find((x) => x.id === id)!
      t.done = !t.done
      return { ...t }
    }),
}
