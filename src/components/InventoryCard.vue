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
    <div class="inventoryCardInfo">
      <a class="inventoryCardText link" href="#" @click="moveToPage()">{{product.InventoryNumber}}</a>
      <p class="inventoryCardText" @click="check()">{{product.ProductName}}</p>
      <p class="inventoryCardText" @click="check()">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="inventoryCardText" @click="check()">{{product.Rank}} / {{product.ProductFixedPrice}}</p>
      <p class="inventoryCardText" @click="check()">{{product.ManufacturerName}}</p>
      <p class="inventoryCardText" @click="check()">{{product.Size}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    check: function () {
      if (!this.product.Selected) {
        if (this.$store.state.quote !== null) {
          this.product.Estimate = this.$store.state.quote
          this.product.EstimateSelect = true
          this.$store.dispatch({type: 'updateProductEstimate', estimateId: this.product.Estimate, productId: this.product.Id})
        }
        this.product.Selected = !this.product.Selected
        this.$store.commit('updateProduct', this.product)
        this.$store.commit('updateSelected', 1)
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
