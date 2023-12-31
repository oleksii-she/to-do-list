import { defineStore } from 'pinia'
import { allToDo, toDoId, toDoCreate, toDoIdUpdate, toDoIdDelete } from '../services/services'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster({ position: 'top' })

export const useToDoStore = defineStore({
  id: 'todo',

  state: () => ({
    toDo: [],
    loading: false,
    error: null,
    createToggle: true
  }),

  actions: {
    async allToDoAction() {
      try {
        this.loading = true
        const toDo = await allToDo()
        this.toDo = toDo

        this.loading = false
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async idToDoAction(id) {
      try {
        const toDo = await toDoId(id)

        return toDo
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      }
    },

    async createToDoAction(newToDo) {
      try {
        this.loading = true
        const toDo = await toDoCreate(newToDo)
        this.toDo.unshift(toDo)
        toaster.success('Added toDo')
        this.loading = false
        return toDo
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async editToDoAction(id, newToDo) {
      try {
        this.loading = true
        const toDo = await toDoIdUpdate(id, newToDo)

        const updatedTodos = this.toDo.map((el) => {
          if (el.id === toDo.id) {
            return toDo
          }
          return el
        })

        this.toDo = updatedTodos
        this.loading = false
        return toDo
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async deleteToDoAction(id) {
      try {
        this.loading = true
        const deleteTodo = await toDoIdDelete(id)
        this.toDo = this.toDo.filter((el) => el.id !== deleteTodo.id)

        if (deleteTodo) {
          toaster.success('Successfully removed toDo')
        }
        this.loading = false
      } catch (error) {
        this.error = error.message
        toaster.error(error.message)
      } finally {
        this.loading = false
      }
    },

    createToggleAction(state) {
      this.createToggle = state
    }
  }
})
