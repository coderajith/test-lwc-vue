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
    productsSize: 0,
    quote: null,
    quoteName: null,
    types: [],
    spinner: true
  },
  getters: {
    getProducts: (state, {dispatch}) => id => {
      return state.products ? state.products.find(product => product.id === id) : {}
    },
    getEstimates: (state, {dispatch}) => id => {
      return state.estimates ? state.estimates.find(estimate => estimate.id === id) : {}
    },
    selectedItems: (state) => { return state.selectedItems },
    getQuote: (state) => { return state.quote }
  },
  mutations: {
    updateEstimates: (state, payload) => {
      let estimates = state.estimates
      estimates.push(payload)
      state.estimates = estimates
    },
    setQuote: (state, payload) => { state.quote = payload },
    setProducts: (state, payload) => {
      state.products = payload
      state.spinner = false
    },
    setEstimates: (state, payload) => { state.estimates = payload },
    setTypes: (state, payload) => {
      state.types = payload
    },
    setProductsSize: (state, payload) => { state.productsSize = payload },
    setIsOpen: (state, payload) => { state.isOpen = payload },
    updateProduct: (state, payload) => {
      state.products.forEach((item) => {
        if (item.Id === payload.Id) {
          item = payload
        }
      })
    },
    createDesc: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.CreatedDate)
        let dateB = new Date(b.CreatedDate)
        return dateB - dateA
      })
    },
    createAsc: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.CreatedDate)
        let dateB = new Date(b.CreatedDate)
        return dateA - dateB
      })
    },
    updateDesc: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.LastModifiedDate)
        let dateB = new Date(b.LastModifiedDate)
        return dateB - dateA
      })
    },
    updateAsc: (state) => {
      state.products.sort((a, b) => {
        let dateA = new Date(a.LastModifiedDate)
        let dateB = new Date(b.LastModifiedDate)
        return dateA - dateB
      })
    },
    deselectProduct: (state) => {
      state.products.forEach((item) => {
        if (item.SelectHold) {
          item.SelectHold = false
          item.Selected = false
          state.selectedHoldCount = state.selectedHoldCount - 1
          state.selectedItems = state.selectedItems - 1
        }
      })
    },
    deselectOneProduct: (state, payload) => {
      state.products.forEach((item) => {
        if (item.SelectHold && item.Id === payload) {
          item.SelectHold = false
          item.Selected = false
          state.selectedHoldCount = state.selectedHoldCount - 1
          state.selectedItems = state.selectedItems - 1
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
    keywordSearch: (state, payload) => {
      state.products.forEach((item) => {
        let dateEmpty = Boolean(item.DateForFilter)
        let dateStart = payload[5][0] ? Boolean(payload[5][0]) : false
        let dateEnd = payload[5][1] ? Boolean(payload[5][1]) : false
        let priceStart = payload[10][0] ? Boolean(payload[10][0]) : false
        let priceEnd = payload[10][1] ? Boolean(payload[10][1]) : false
        let itemWidth = item.Width ? parseInt(item.Width) : 0
        let widthStart = payload[11][0] ? Boolean(payload[11][0]) : false
        let widthEnd = payload[11][1] ? Boolean(payload[11][1]) : false
        let itemDepth = item.Depth ? parseInt(item.Depth) : 0
        let depthStart = payload[11][2] ? Boolean(payload[11][2]) : false
        let depthEnd = payload[11][3] ? Boolean(payload[11][3]) : false
        let itemHeight = item.Height ? parseInt(item.Height) : 0
        let heightStart = payload[11][4] ? Boolean(payload[11][4]) : false
        let heightEnd = payload[11][5] ? Boolean(payload[11][5]) : false
        if ((item.InventoryNumber.indexOf(payload[0].toUpperCase()) > -1 ||
        item.ProductName.toUpperCase().indexOf(payload[0].toUpperCase()) > -1 ||
        item.EngName.toUpperCase().indexOf(payload[0].toUpperCase()) > -1 ||
        item.ManufacturerName.toUpperCase().indexOf(payload[0].toUpperCase()) > -1 ||
        item.EstimateName.toUpperCase().indexOf(payload[0].toUpperCase()) > -1 ||
        item.Supplier.toUpperCase().indexOf(payload[0].toUpperCase()) > -1) &&
        item.BigType.indexOf(payload[1]) > -1 &&
        item.MediumType.indexOf(payload[2]) > -1 &&
        item.SmallType.indexOf(payload[3]) > -1 &&
        (((payload[4][0] ? item.CurrentStatus.indexOf('発注済') > -1 : false) ||
          (payload[4][1] ? (item.CurrentStatus.indexOf('在庫') > -1 && (
            item.CurrentAuxiliaryStatus.indexOf('入庫済') > -1 || item.CurrentAuxiliaryStatus.indexOf('入庫ﾁｪｯｸ済') > -1)
          ) : false) ||
          (payload[4][2] ? (item.CurrentStatus.indexOf('リース中') > -1 && item.CurrentAuxiliaryStatus.indexOf('返却予定') > -1) : false) ||
          (payload[4][3] ? (item.CurrentStatus.indexOf('リース中') > -1 && item.CurrentAuxiliaryStatus.indexOf('返却予定') === -1) : false))) &&
        (dateEmpty ? (
          (dateStart && item.DateForFilter !== '' ? new Date(item.DateForFilter) >= new Date(payload[5][0]) : true) &&
          (dateEnd && item.DateForFilter !== '' ? new Date(item.DateForFilter) <= new Date(payload[5][1]) : true)) : true) &&
          (payload[6] ? true : item.SpecialFlg === false) &&
          (payload[7] ? true : item.Hold === false) &&
          (payload[8] ? true : item.LongOrShort.indexOf('短期専用') < 0) &&
          payload[9].includes(item.Rank) &&
          (priceStart ? parseInt(item.UnitPriceLease) >= parseInt(payload[10][0]) : true) &&
          (priceEnd ? parseInt(item.UnitPriceLease) <= parseInt(payload[10][1]) : true) &&
          (widthStart ? itemWidth >= parseInt(payload[11][0]) : true) &&
          (widthEnd ? itemWidth <= parseInt(payload[11][1]) : true) &&
          (depthStart ? itemDepth >= parseInt(payload[11][2]) : true) &&
          (depthEnd ? itemDepth <= parseInt(payload[11][3]) : true) &&
          (heightStart ? itemHeight >= parseInt(payload[11][4]) : true) &&
          (heightEnd ? itemHeight <= parseInt(payload[11][5]) : true)) {
          item.Show = true
        } else {
          item.Show = false
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
    getAllProducts: ({commit}) => {
      InventoryItems.getProducts(products => {
        InventoryItems.getImageMap(imageMap => {
          products.forEach((product) => {
            product.Links = imageMap[product.Id]
          })
          commit('setProducts', products)
          commit('setProductsSize', products.length)
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
      InventoryItems.updateProductEstimate(payload.estimateId, payload.productId)
    }
  }
})
