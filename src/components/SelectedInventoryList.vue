<template>
  <div class="selectedInventoryContainer">
    <p class="selectedInventoryHeader">Selected inventory list</p>
    <div class="paddingLeftRight">
      <b-button type="is-dark">←  Move to quote page</b-button>
      <b-field label="Target quote">
        <b-select placeholder="Select a Target quote" >
          <option value="newest">1</option>
          <option value="last">2</option>
        </b-select>
      </b-field>
      <p class="numberSelected">Number of inventories selected: {{selectedItems}}</p>
    </div>
    <div class="">
      <div class="" v-for="product in products">
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
