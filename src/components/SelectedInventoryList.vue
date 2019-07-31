<template>
  <div class="selectedInventoryContainer">
    <p class="selectedInventoryHeader">HOLD中の在庫リスト</p>
    <div class="paddingLeftRight">
      <b-button type="is-dark">←  見積画面へ移動する</b-button>
      <b-field label="対象見積">
        <b-select placeholder="入力してください" >
          <option value="newest">1</option>
          <option value="last">2</option>
        </b-select>
      </b-field>
      <p class="numberSelected">HOLD件数: {{selectedItems}}</p>
    </div>
    <div class="scroll">
      <div v-for="product in products">
        <SelectedInventoryCard v-if="product.Selected" :product="product"/>
      </div>
    </div>
  </div>
</template>
<script>
import SelectedInventoryCard from './SelectedInventoryCard'
export default {
  components: {
    SelectedInventoryCard
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    selectedItems () {
      return this.$store.state.selectedItems
    }
  },
  created () {
    if (!this.products) {
      this.$store.dispatch('getAllProducts')
    }
  }
}
</script>
