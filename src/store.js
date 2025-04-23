import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'Learn Vue.js', done: true },
      { id: 2, text: 'Build something cool', done: false },
    ],
  },
  mutations: {

  },
  actions: {
    // Your actions to commit mutations
  },
  getters: {
    allTodos: state => {
 
      return state.todos;
    },

    // Getter to get only completed todos
    completedTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    // Getter to get todo by id
    todoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    },
  },
 
})
