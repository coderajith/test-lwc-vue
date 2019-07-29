<template>
  <div class="flexContainer">
    <SelectedInventoryList />
    <div class="inventorySearchPage">
      <div class="productContainerHeader">
        <p class="inventorySearchPageTitle">在庫検索リスト</p>
        <div class="flexContainer allignCenter">
          <p class="inventorySearchPageTitle">検索結果件数: {{ products ? products.length : 0}}</p>
          <b-field>
            <b-select v-model="order" @input="sort()">
              <option value="createDesc">登録日が新しい順</option>
              <option value="createAsc">登録日が古い順</option>
              <option value="updateDesc">最終更新日が新しい順</option>
              <option value="updateAsc">最終更新日が古い順</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="productContainerList">
        <div class="productContainer" v-for="product in products">
          <InventoryCard v-if="product.Show" :product="product"/>
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
      order: 'createDesc'
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
      if (this.order === 'createDesc') {
        this.$store.commit('createDesc')
      }
      if (this.order === 'createAsc') {
        this.$store.commit('createAsc')
      }
      if (this.order === 'updateDesc') {
        this.$store.commit('updateDesc')
      }
      if (this.order === 'updateAsc') {
        this.$store.commit('updateAsc')
      }
    }
  }
}
</script>
