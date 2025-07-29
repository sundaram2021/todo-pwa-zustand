import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { persist } from "zustand/middleware"

type Store = {
  todos: string[]
  addTodo: (todo: string) => void
  removeTodo: (todo: string) => void
  clearTodos: () => void
  updateTodo?: (oldTodo: string, newTodo: string) => void
}



const store: StateCreator<Store> = (set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (todo) => set((state) => ({ todos: state.todos.filter(t => t !== todo) })),
    clearTodos: () => set({ todos: [] }),
    updateTodo: (oldTodo, newTodo) => set((state) => ({ todos: state.todos.map(t => t === oldTodo ? newTodo : t) }))
})

export const useStore = create(persist(store, { name: 'store' }))

