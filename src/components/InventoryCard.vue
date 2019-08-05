<template>
  <div style="padding: 4px;" class="cardDiv">
    <div class="imageContainer" @click="check()">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="inventoryCardImage"/>
      <img v-else="product.Selected" src="../assets/image.png" class="inventoryCardImageNotExist"/>
    </div>
    <div class="round" @click="navigateToDetails()">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div v-if="product.Selected" class="leftCorner"></div>
    <p v-if="product.Selected" class="hold">HOLD</p>
    <div v-if="product.Selected" class="holdActive"></div>
    <div class="inventoryCardInfo" @click="check()">
      <a class="inventoryCardText link" href="#" @click="moveToPage()">{{product.InventoryNumber}}</a>
      <p class="inventoryCardText">{{product.ProductName}}</p>
      <p class="inventoryCardText">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="inventoryCardText">{{product.Rank}} / {{product.ProductFixedPrice}}</p>
      <p class="inventoryCardText">{{product.ManufacturerName}}</p>
      <p class="inventoryCardText">{{product.Size}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    check: function () {
      if (!this.product.Selected) {
        this.product.Selected = !this.product.Selected
        this.$store.commit('updateSelected', 1)
        this.$store.commit('updateProduct', this.product)
      }
    },
    navigateToDetails: function () {
      this.$store.dispatch({ type: 'navigateToRecord', productId: this.product.Id })
    },
    moveToPage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.product.Id })
    }
  }
}
</script>
