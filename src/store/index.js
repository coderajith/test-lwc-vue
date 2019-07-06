import Vue from 'vue'
import Vuex from 'vuex'
import contatcAPI from '../api/contact'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: null
  },
  getters: {
    getContact: (state, {dispatch}) => id => {
      return state.contacts ? state.contacts.find(contact => contact.id === id) : {}
    }
  },
  mutations: {
    setContacts: (state, payload) => { state.contacts = payload }
  },
  actions: {
    getAllContacts: ({commit}) => {
      contatcAPI.getContacts(contacts => {
        commit('setContacts', contacts)
      })
    }
  }
})
