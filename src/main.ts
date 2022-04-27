import { defineCustomElement } from 'vue'
import App from './App.vue'
import WaterRestrictionSlot from './components/WaterRestrictionSlot.vue'

window.customElements.define('hc-water-restrictions', defineCustomElement(App))
window.customElements.define(
  'hc-water-restrictions-slot',
  defineCustomElement(WaterRestrictionSlot)
)

const el = document.querySelector('hc-water-restrictions')
const linkedStyle = document.createElement('link')
linkedStyle.rel = 'stylesheet'
linkedStyle.href =
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
el?.shadowRoot?.appendChild(linkedStyle)
