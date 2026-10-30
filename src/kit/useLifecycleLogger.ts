import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'
import type { EventLogApi } from './useEventLog'

/** Logs every lifecycle hook of the calling component into an event log */
export function useLifecycleLogger(name: string, { log }: Pick<EventLogApi, 'log'>) {
  log(`${name}: setup()`, 'hook')
  onBeforeMount(() => log(`${name}: onBeforeMount`, 'hook'))
  onMounted(() => log(`${name}: onMounted`, 'success'))
  onBeforeUpdate(() => log(`${name}: onBeforeUpdate`, 'hook'))
  onUpdated(() => log(`${name}: onUpdated`, 'effect'))
  onBeforeUnmount(() => log(`${name}: onBeforeUnmount`, 'warn'))
  onUnmounted(() => log(`${name}: onUnmounted`, 'error'))
  onActivated(() => log(`${name}: onActivated`, 'success'))
  onDeactivated(() => log(`${name}: onDeactivated`, 'warn'))
}
