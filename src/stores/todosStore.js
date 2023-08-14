import { defineStore } from 'pinia'
import { allToDo, toDoId, toDoCreate, toDoIdUpdate } from '../services/services'

export const useToDoStore = defineStore({
  id: 'todo',

  state: () => ({
    toDo: [],
    loading: false,
    error: null
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
      } finally {
        this.loading = false
      }
    },

    async idToDoAction(id) {
      try {
        this.loading = true
        const toDo = await toDoId(id)
        this.loading = false
        return toDo
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createToDoAction(newToDo) {
      try {
        console.log(newToDo, 'newToDoStore')
        this.loading = true
        const toDo = await toDoCreate(newToDo)
        this.toDo.push(toDo.data)
        this.loading = false
        return 'ok'
      } catch (error) {
        this.error = error.message
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
        return 'ok'
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
