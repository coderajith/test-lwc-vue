import Vue from 'vue'
import Vuex from 'vuex'
import InventoryItems from '../api/InventoryItems'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: null
  },
  getters: {
    getProducts: (state, {dispatch}) => id => {
      return state.products ? state.products.find(product => product.id === id) : {}
    }
  },
  mutations: {
    setProducts: (state, payload) => { state.products = payload }
  },
  actions: {
    getAllProducts: ({commit}) => {
      InventoryItems.getProducts(products => {
        commit('setProducts', products)
      })
    }
  }
})
