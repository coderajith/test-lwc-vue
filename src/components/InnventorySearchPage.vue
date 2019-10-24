<template>
  <div class="flexContainer">
    <SelectedInventoryList />
    <div class="inventorySearchPage">
      <div class="productContainerHeader">
        <p class="inventorySearchPageTitle">在庫検索リスト</p>
        <div class="flexContainer allignCenter">
          <p class="inventorySearchPageTitle">検索結果件数: {{ productSize }}</p>
          <b-field>
            <b-select v-model="order" @input="sort()">
              <option value="CreatedDate DESC">登録日が新しい順</option>
              <option value="CreatedDate ASC">登録日が古い順</option>
              <option value="LastModifiedDate DESC">最終更新日が新しい順</option>
              <option value="LastModifiedDate ASC">最終更新日が古い順</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div style="padding: 0.5rem;">
        <b-pagination
            :total="productSize"
            :current="this.$store.state.currentPage"
            @change="paginate"
            range-before="1"
            range-after="1"
            order="is-centered"
            size=""
            :simple="simple"
            :rounded="rounded"
            per-page="30"
            icon-pack="fa"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </b-pagination>
      </div>
      <div class="productContainerList">
        <div class="productContainer" v-for="product in products">
          <InventoryCard v-if="product.Show" :product="product"/>
        </div>
      </div>
    </div>
    <CollapsibleFilter />
    <b-loading :is-full-page="true" :active.sync="this.$store.state.spinner" :can-cancel="false"></b-loading>
  </div>
</template>
<script>
import InventoryCard from './InventoryCard'
import CollapsibleFilter from './CollapsibleFilter'
import SelectedInventoryList from './SelectedInventoryList'

export default {
  components: {
    InventoryCard,
    CollapsibleFilter,
    SelectedInventoryList
  },
  data () {
    return {
      rangeBefore: 1,
      rangeAfter: 1,
      simple: false,
      rounded: true,
      order: 'LastModifiedDate ASC',
      syncneed: false,
      lang: {
        days: ['日', '月', '火', '水', '木', '金', '土']
      },
      keywordSearchValue: '',
      bigType: 'All',
      mediumType: 'All',
      smallType: 'All',
      currentStatus: [false, true, true, false],
      dateForFilter: [],
      specialFlg: true,
      hold: false,
      longOrShortOne: true,
      longOrShortSecond: false,
      checkboxGroup: ['A', 'B', 'C', 'D', 'M', 'N', 'S', 'P', 'ランク未確定'],
      unitPrice: [0, 9999999],
      size: [0, 9999999, 0, 9999999, 0, 9999999],
      isOpenOne: true,
      isOpenSecond: true,
      isOpenThree: true,
      isOpenFour: true,
      big: [],
      medium: [],
      small: []
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productSize () {
      if (this.$store.state.products === null) {
        return 0
      } else {
        return this.$store.state.productsSize
      }
    }
  },
  created () {
    this.$store.dispatch('filterIsOpen')
    if (this.big.length === 0) {
      this.$store.dispatch('getAllTypes')
    }
    if (localStorage.getItem('orderName') != null) {
      this.order = localStorage.getItem('orderName')
    }
    if (localStorage.getItem('dataDilter') != null) {
      let allData = JSON.parse(localStorage.getItem('dataDilter'))
      this.keywordSearchValue = allData.keywordSearchValue
      this.bigType = allData.bigType
      this.mediumType = allData.mediumType
      this.smallType = allData.smallType
      this.specialFlg = allData.specialFlg
      this.hold = allData.hold
      this.longOrShortOne = allData.longOrShortOne
      this.longOrShortSecond = allData.longOrShortSecond
      this.currentStatus = allData.currentStatus
      this.dateForFilter = allData.dateForFilter
      this.checkboxGroup = allData.checkboxGroup
      this.unitPrice = allData.unitPrice
      this.size = allData.size
    } else {
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    }
    if (!this.products) {
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShortOne: this.longOrShortOne,
        longOrShortSecond: this.longOrShortSecond,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: 0
      })
    }
    if (!this.estimates) {
      this.$store.dispatch('getAllEstimate')
    }
    if (localStorage.getItem('orderName') != null) {
      let orderName = localStorage.getItem('orderName')
      this.order = orderName
    } else {
      localStorage.setItem('orderName', 'LastModifiedDate ASC')
    }
  },
  methods: {
    sort: function () {
      this.$store.commit('setSpinner')
      if (this.order === 'CreatedDate DESC') {
        localStorage.setItem('orderName', 'CreatedDate DESC')
      }
      if (this.order === 'CreatedDate ASC') {
        localStorage.setItem('orderName', 'CreatedDate ASC')
      }
      if (this.order === 'LastModifiedDate DESC') {
        localStorage.setItem('orderName', 'LastModifiedDate DESC')
      }
      if (this.order === 'LastModifiedDate ASC') {
        localStorage.setItem('orderName', 'LastModifiedDate ASC')
      }

      if (localStorage.getItem('dataDilter') != null) {
        let allData = JSON.parse(localStorage.getItem('dataDilter'))
        this.keywordSearchValue = allData.keywordSearchValue
        this.bigType = allData.bigType
        this.mediumType = allData.mediumType
        this.smallType = allData.smallType
        this.specialFlg = allData.specialFlg
        this.hold = allData.hold
        this.longOrShortOne = allData.longOrShortOne
        this.longOrShortSecond = allData.longOrShortSecond
        this.currentStatus = allData.currentStatus
        this.dateForFilter = allData.dateForFilter
        this.checkboxGroup = allData.checkboxGroup
        this.unitPrice = allData.unitPrice
        this.size = allData.size
      }

      let offsetSize = this.$store.state.currentPage > 0 ? (this.$store.state.currentPage - 1) * 30 : 0
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShortOne: this.longOrShortOne,
        longOrShortSecond: this.longOrShortSecond,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: offsetSize
      })
    },
    paginate: function (page) {
      this.$store.commit('setSpinner')
      let offsetSize = page > 0 ? (page - 1) * 30 : 0
      this.$store.commit('setCurrentPage', page)
      if (localStorage.getItem('dataDilter') != null) {
        let allData = JSON.parse(localStorage.getItem('dataDilter'))
        this.keywordSearchValue = allData.keywordSearchValue
        this.bigType = allData.bigType
        this.mediumType = allData.mediumType
        this.smallType = allData.smallType
        this.specialFlg = allData.specialFlg
        this.hold = allData.hold
        this.longOrShortOne = allData.longOrShortOne
        this.longOrShortSecond = allData.longOrShortSecond
        this.currentStatus = allData.currentStatus
        this.dateForFilter = allData.dateForFilter
        this.checkboxGroup = allData.checkboxGroup
        this.unitPrice = allData.unitPrice
        this.size = allData.size
      }
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShortOne: this.longOrShortOne,
        longOrShortSecond: this.longOrShortSecond,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: offsetSize
      })
    }
  }
}
</script>
