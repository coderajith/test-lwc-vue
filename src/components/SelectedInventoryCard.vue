<template>
  <div class="selectedInventoryCardContainer" @click="unCheck()">
    <div class="selectedImageContainer">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="selectedInventoryCardImage"/>
      <img v-else="checked" src="../assets/image.png" class="selectedInventoryCardImageNotExist"/>
    </div>
    <div class="selectedInventoryCardInfo">
      <p class="selecytedInventoryCardText">{{product.InventoryNumber}}</p>
      <p class="selecytedInventoryCardText">{{product.ProductName}} / {{product.Rank}}</p>
      <p class="selecytedInventoryCardText">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="selecytedInventoryCardText">{{product.ManufacturerName}} / {{product.ProductFixedPrice}}</p>
      <p class="selecytedInventoryCardText">{{product.Size}}</p>
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
