<template>
  <div class="flexContainer">
    <SelectedInventoryList />
    <div class="inventorySearchPage">
      <div class="productContainerHeader">
        <p class="inventorySearchPageTitle">Inventory search list</p>
        <div class="flexContainer allignCenter">
          <p class="inventorySearchPageTitle">Number of search results: {{ products ? products.length : 0}}</p>
          <b-field>
            <b-select v-model="order" @input="sort()">
              <option value="newest">Newest order</option>
              <option value="last">Last updated date</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="productContainerList">
        <div class="productContainer" v-for="product in products">
          <InventoryCard :product="product"/>
        </div>
      </div>
    </div>
    <CollapsibleFilter />
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
      order: 'newest'
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    if (!this.products) {
      this.$store.dispatch('getAllProducts')
    }
  },
  methods: {
    sort: function () {
      if (this.order === 'newest') {
        this.$store.commit('sortNewest')
      } else {
        this.$store.commit('sortLast')
      }
    }
  }
}
</script>
