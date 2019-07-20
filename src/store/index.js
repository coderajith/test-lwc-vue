import Vue from 'vue'
import Vuex from 'vuex'
import InventoryItems from '../api/InventoryItems'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: null,
    selectedItems: 0
  },
  getters: {
    getProducts: (state, {dispatch}) => id => {
      return state.products ? state.products.find(product => product.id === id) : {}
    },
    selectedItems: (state) => { return state.selectedItems }
  },
  mutations: {
    setProducts: (state, payload) => { state.products = payload },
    updateProduct: (state, payload) => {
      state.products.forEach((item) => {
        if (item.Id === payload.Id) {
          item = payload
        }
      })
    },
    sortNewest: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.CreatedDate)
        let dateB = new Date(b.CreatedDate)
        return dateB - dateA
      })
    },
    sortLast: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.LastModifiedDate)
        let dateB = new Date(b.LastModifiedDate)
        return dateB - dateA
      })
    },
    updateSelected: (state, payload) => { state.selectedItems = state.selectedItems + payload }
  },
  actions: {
    getAllProducts: ({commit}) => {
      InventoryItems.getProducts(products => {
        commit('setProducts', products)
      })
    }
  }
})
