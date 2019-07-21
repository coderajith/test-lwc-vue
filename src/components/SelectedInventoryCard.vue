<template>
  <div class="selectedInventoryCardContainer" @click="unCheck()">
    <div class="selectedImageContainer">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="selectedInventoryCardImage"/>
      <img v-else="checked" src="../assets/image.png" class="selectedInventoryCardImageNotExist"/>
    </div>
    <div class="selectedInventoryCardInfo">
      <p class="selecytedInventoryCardText">Product Price: {{product.ProductPrice}}</p>
      <p class="selecytedInventoryCardText">Product Name: {{product.Name}}</p>
      <p class="selecytedInventoryCardText">Rank: {{product.Rank}}</p>
      <p class="selecytedInventoryCardText">Status: {{product.CurrentStatus}}</p>
      <p class="selecytedInventoryCardText">Model Number: {{product.ModelNumber}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  props: ['product'],
  methods: {
    unCheck: function () {
      this.product.Selected = false
      this.$store.commit('updateSelected', -1)
      this.$store.commit('updateProduct', this.product)
    }
  }
}
</script>
