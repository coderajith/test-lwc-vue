<template>
  <div :class="classObject">
    <div class="selectedImageContainer" @click="select()">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="selectedInventoryCardImage"/>
      <img v-else="checked" src="../assets/image.png" class="selectedInventoryCardImageNotExist"/>
    </div>
    <div class="roundSelected" @click="navigateToDetails()">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div class="selectedInventoryCardInfo">
      <a class="selecytedInventoryCardText link" href="#" @click="moveToPage()">{{product.InventoryNumber}}</a>
      <p class="selecytedInventoryCardText" @click="select()">{{product.ProductName}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.Rank}} / {{product.ProductFixedPrice}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.ManufacturerName}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.Size}}</p>
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
  computed: {
    classObject: function () {
      return this.product.SelectHold ? 'selectedInventoryCardContainer greenSelected' : 'selectedInventoryCardContainer'
    }
  },
  methods: {
    select: function () {
      this.product.SelectHold = !this.product.SelectHold
      this.$store.commit('updateSelectedHold', this.product.SelectHold ? 1 : -1)
      this.$store.commit('updateProduct', this.product)
    },
    moveToPage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.product.Id })
    },
    navigateToDetails: function () {
      this.$store.dispatch({ type: 'navigateToRecord', productId: this.product.Id })
    }
  }
}
</script>
