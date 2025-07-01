import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
     userData: null
  },
  mutations: {
      setUserData(state, payload) {
        state.userData = payload;
      }
  },
  actions: {
    updateUserData({ commit }, userData) {
      commit('setUserData', userData);
    }
    
  },
  getters: {
     getUserData: state => state.userData
  },
 
})
