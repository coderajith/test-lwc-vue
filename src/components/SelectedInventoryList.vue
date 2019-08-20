<template>
  <div class="selectedInventoryContainer">
    <p class="selectedInventoryHeader">HOLD中の在庫リスト</p>
    <div class="paddingLeftRight">
      <b-button type="is-dark" :disabled="getQuote" @click="moveToPage()">←  見積画面へ移動する</b-button>
      <b-field label="対象見積">
            <b-autocomplete
                v-model="name"
                placeholder="入力してください"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :data="filteredDataObj"
                field="Name"
                @select="option => {selected = option; addQuote()}">
                <template slot="footer">
                    <a @click="addNewQuote()">
                        <span>+ 新規見積</span>
                    </a>
                </template>
            </b-autocomplete>
        </b-field>
      <div style="display: flex;">
        <b-button v-if="getSelectedHoldCount > 0" @click="deselectProduct" class="whiteButton" style="margin-right: 0.5rem;">HOLD解除</b-button>
        <b-button v-if="getSelectedHoldCount === 1" @click="print" class="is-dark" style="margin-left: 0.5rem;">PDF出力</b-button>
        <b-button v-if="getSelectedHoldCount > 1" @click="printMany" class="is-dark" style="margin-left: 0.5rem;">PDF出力</b-button>
      </div>
      <p v-if="getSelectedHoldCount == 0" class="numberSelected">HOLD件数: {{selectedItems}}</p>
      <p v-if="getSelectedHoldCount > 0" class="numberSelected">選択件数: {{getSelectedHoldCount}}</p>
    </div>
    <PrintOne id="PrintOne" v-if="selectedOneProduct !== null" :product="selectedOneProduct" style="visibility: hidden; display: none !important;" />
    <PrintMany id="PrintMany" v-if="selectedManyProduct !== null" :products="selectedManyProduct" :estimate="selected" style="visibility: hidden; display: none !important;" />
    <div class="scroll" id="printMe">
      <div v-for="product in products">
        <SelectedInventoryCard v-if="product.Selected" :product="product"/>
      </div>
    </div>
  </div>
</template>
<script>
import SelectedInventoryCard from './SelectedInventoryCard'
import PrintOne from './PrintOne'
import PrintMany from './PrintMany'
export default {
  data () {
    return {
      keepFirst: false,
      openOnFocus: true,
      name: '',
      selected: null,
      selectedOneProduct: null,
      selectedManyProduct: null
    }
  },
  components: {
    SelectedInventoryCard,
    PrintOne,
    PrintMany
  },
  computed: {
    getSelectedHoldCount () {
      if (this.$store.state.selectedHoldCount === 1) {
        this.selectedOneProduct = this.$store.state.products.filter(item => item.SelectHold === true)[0]
      } else if (this.$store.state.selectedHoldCount > 1) {
        this.selectedManyProduct = this.$store.state.products.filter(item => item.SelectHold === true)
      } else {
        this.selectedOneProduct = null
        this.selectedManyProduct = null
      }
      return this.$store.state.selectedHoldCount
    },
    getQuote () {
      return this.$store.state.quote === null
    },
    products () {
      return this.$store.state.products
    },
    estimates () {
      if (this.$store.state.estimates === null) {
        return []
      } else {
        return this.$store.state.estimates
      }
    },
    selectedItems () {
      return this.$store.state.selectedItems
    },
    filteredDataObj () {
      return this.estimates.filter((option) => {
        return option.Name
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      }).sort((a, b) => {
        let dateA = new Date(a.LastModifiedDate)
        let dateB = new Date(b.LastModifiedDate)
        return dateB - dateA
      }).slice(0, 5)
    }
  },
  created () {
    if (!this.products) {
      this.$store.dispatch('getAllProducts')
    }
    if (!this.estimates) {
      this.$store.dispatch('getAllEstimate')
    }
  },
  methods: {
    print () {
      const prtHtml = document.getElementById('PrintOne').innerHTML
      let stylesHtml = ''
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML
      }
      const WinPrint = window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0')
      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`)
      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
    },
    printMany () {
      const prtHtml = document.getElementById('PrintMany').innerHTML
      let stylesHtml = ''
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML
      }
      const WinPrint = window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0')
      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`)
      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
    },
    deselectProduct () {
      this.$store.state.products.forEach((item) => {
        if (item.SelectHold && this.$store.state.quote !== null) {
          item.Estimate = ''
          item.EstimateSelect = true
          item.EstimateSelected = false
          this.$store.commit('updateProduct', item)
          this.$store.dispatch({type: 'updateProductEstimate', estimateId: '', productId: item.Id})
        }
      })
      this.$store.commit('deselectProduct')
    },
    addQuote () {
      if (this.selected !== null) {
        this.$store.state.products.forEach(item => {
          if (item.SelectHold) {
            item.SelectHold = false
            this.$store.commit('updateSelectedHold', -1)
          }
          if (item.Estimate.length === 0 && item.Selected) {
            console.log(item.Estimate)
            item.Selected = false
          }
        })
        this.$store.commit('addQuote', this.selected.Id)
      } else {
        this.$store.state.products.forEach(item => {
          if (item.SelectHold) {
            item.SelectHold = false
            this.$store.commit('updateSelectedHold', -1)
          }
        })
        this.$store.commit('addQuote', null)
      }
    },
    moveToPage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.$store.state.quote })
    },
    addNewQuote () {
      this.$store.dispatch('addNewQuote')
    }
  }
}
</script>
