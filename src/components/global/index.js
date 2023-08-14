import UModal from './UModal.vue'

const components = [{ name: 'UModal', component: UModal }]
export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
