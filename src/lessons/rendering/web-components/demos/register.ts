import { defineCustomElement, h } from 'vue'
import LabCounter from './LabCounter.ce.vue'

// Options API flavour: this.$host is the custom element
const LabTime = defineCustomElement({
  props: { tz: String },
  data: () => ({ now: new Date() }),
  mounted() {
    ;(this.$host as HTMLElement | null)?.style.setProperty("display", "inline-block")
  },
  render() {
    return h('code', { style: 'color:#42b883' }, `<lab-time> ${this.now.toLocaleTimeString('en', { timeZone: this.tz })} (${this.tz})`)
  },
})

// customElements.define can only run once per tag name
export function registerLabElements() {
  if (!customElements.get('lab-counter')) customElements.define('lab-counter', defineCustomElement(LabCounter))
  if (!customElements.get('lab-time')) customElements.define('lab-time', LabTime)
}
