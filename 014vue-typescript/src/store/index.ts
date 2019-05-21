import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Todo {
    content: string
    dateTime: number
    isComplete: boolean
}

export interface TodoState {
    todoList: Todo[]
}

const state: TodoState = {
  todoList: []
}

export default new Vuex.Store({
  state,
  mutations: {

  },
  actions: {

  }
})
