import axiosInstance from '../utils/axios'

export const allToDo = async () => {
  const res = await axiosInstance.get(`/todos`)

  return res.data
}

export const toDoId = async (id) => {
  const res = await axiosInstance.get(`/todos/${id}`)

  return res.data
}

export const toDoCreate = async (newToDo) => {
  const res = await axiosInstance.post(`/todos`, newToDo)
  return res.data
}

export const toDoIdUpdate = async (id, newToDo) => {
  const res = await axiosInstance.put(`/todos/${id}`, newToDo)

  return res.data
}

export const toDoIdDelete = async (id) => {
  const res = await axiosInstance.delete(`/todos/${id}`)

  return res.data
}
