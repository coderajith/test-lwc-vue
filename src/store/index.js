import Vue from 'vue'
import Vuex from 'vuex'
import InventoryItems from '../api/InventoryItems'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: null,
    estimates: null,
    selectedItems: 0,
    selectedHoldCount: 0,
    isOpen: false,
    isOpenLeft: true,
    productsSize: 0,
    quote: null,
    quoteName: null,
    types: [],
    spinner: true,
    currentPage: 1,
    productsQuote: [],
    productsQuoteSize: 0,
    isOpenFilter: false
  },
  mutations: {
    updateEstimates: (state, payload) => {
      let estimates = state.estimates
      estimates.push(payload)
      state.estimates = estimates
    },
    setProductsQuote: (state, payload) => {
      state.productsQuote = payload
    },
    setSpinnerStatus: (state, payload) => {
      state.spinner = payload
    },
    setProductsQuoteRetrive: (state, payload) => {
      state.productsQuote = state.productsQuote.concat(payload)
    },
    setProductsQuoteSize: (state, payload) => {
      let prodCount = 0
      state.productsQuote.forEach((item) => {
        if (item.Estimate === state.quote) {
          prodCount++
        }
      })
      state.productsQuoteSize = prodCount
    },
    setQuote: (state, payload) => { state.quote = payload },
    setCurrentPage: (state, payload) => { state.currentPage = payload },
    setProducts: (state, payload) => {
      state.spinner = false
      if (payload.length < 1) {
        state.products = []
      } else {
        let ids = []
        if (state.quote === null || state.quote === '') {
          state.productsQuote.forEach(item => {
            ids.push(item.Id)
          })
          payload.forEach(item => {
            if (ids.includes(item.Id)) {
              item.Selected = true
              item.isImageModalActive = false
            }
          })
        }
        state.products = payload
      }
    },
    setEstimates: (state, payload) => { state.estimates = payload },
    setTypes: (state, payload) => {
      state.types = payload
    },
    setProductsSize: (state, payload) => { state.productsSize = payload },
    setIsOpen: (state, payload) => { state.isOpen = payload },
    setIsOpenLeft: (state, payload) => { state.isOpenLeft = payload },
    setIsOpenFilter: (state, payload) => { state.isOpenFilter = payload },
    setSpinner: (state) => { state.spinner = true },
    updateProduct: (state, payload) => {
      state.products.forEach((item) => {
        if (item.Id === payload.Id) {
          item = payload
        }
      })
      state.productsQuote.forEach((item) => {
        if (item.Id === payload.Id) {
          item = payload
        }
      })
    },
    deselectProduct: (state) => {
      let result = []
      let itemIds = []
      state.productsQuote.forEach((item) => {
        if (!item.SelectHold) {
          result.push(item)
        } else {
          itemIds.push(item.Id)
          state.selectedHoldCount = state.selectedHoldCount - 1
          state.selectedItems = state.selectedItems - 1
        }
      })

      state.productsQuote = result
      state.productsQuoteSize = result.length

      state.products.forEach((item) => {
        if (itemIds.includes(item.Id)) {
          item.SelectHold = false
          item.Selected = false
          item.EstimateSelected = false
          item.Hold = false
        }
      })
    },
    addQuoteName: (state, payload) => {
      state.quoteName = payload
    },
    addQuote: (state, payload) => {
      state.quote = payload
      state.products.forEach((item) => {
        if (item.Selected === true && item.EstimateSelect === true && item.Estimate !== payload) {
          item.EstimateSelect = false
          item.Selected = false
          state.selectedItems = state.selectedItems - 1
        } else if (item.Estimate === payload) {
          item.EstimateSelect = true
          item.Selected = true
          state.selectedItems = state.selectedItems + 1
        }
      })
    },
    updateSelected: (state, payload) => { state.selectedItems = state.selectedItems + payload },
    updateSelectedHold: (state, payload) => { state.selectedHoldCount = state.selectedHoldCount + payload },
    calculateProducts: (state) => {
      let prodSize = 0
      state.products.forEach((item) => {
        if (item.Show) {
          prodSize++
        }
      })
      state.productsSize = prodSize
    }
  },
  actions: {
    getInventoryProductsWithFilter: ({commit}, payload) => {
      InventoryItems.getInventoryProductsWithFilter(payload, result => {
        let productIds = []
        result[0].forEach(product => {
          productIds.push(product.Id)
        })
        InventoryItems.getImageMap(productIds, imageMap => {
          result[0].forEach((product) => {
            product.Links = imageMap[product.Id]
          })
          console.log(result)
          commit('setProducts', result[0])
          commit('setProductsSize', result[1])
        })
      })
    },
    getInventoryProductsForQuote: ({commit}, payload) => {
      InventoryItems.getInventoryProductsForQuote(payload, result => {
        let productIds = []
        result.forEach(product => {
          productIds.push(product.Id)
        })
        InventoryItems.getImageMap(productIds, imageMap => {
          result.forEach((product) => {
            product.Links = imageMap[product.Id]
          })
          console.log(result)
          commit('setProductsQuoteRetrive', result)
          commit('setProductsQuoteSize', result.length)
        })
      })
    },
    getAllEstimate: ({commit}) => {
      InventoryItems.getEstimates(estimates => {
        commit('setEstimates', estimates)
      })
    },
    getAllTypes: ({commit}) => {
      InventoryItems.getTypes(types => {
        commit('setTypes', types)
      })
    },
    navigateToRecord: ({commit}, payload) => {
      InventoryItems.navigateToRecord(payload.productId)
    },
    navigateToEstimate: ({commit}, payload) => {
      InventoryItems.navigateToEstimate(payload.estimateId)
    },
    addNewQuote: ({commit}) => {
      InventoryItems.addNewQuote()
    },
    updateUserInfo: ({commit}, payload) => {
      InventoryItems.updateUserInfo(payload.isOpen)
    },
    filterIsOpen: ({commit}) => {
      InventoryItems.filterIsOpen(isOpen => {
        commit('setIsOpen', isOpen)
      })
    },
    updateProductEstimate: ({commit}, payload) => {
      commit('setSpinnerStatus', true)
      InventoryItems.updateProductEstimate(payload.estimateId, payload.productId, result => {
        commit('setSpinnerStatus', false)
      })
    }
  }
})
