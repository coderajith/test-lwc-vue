<template>
  <div>
    <div class="imageContainer">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="inventoryCardImage"/>
      <img v-else="product.Selected" src="../assets/image.png" class="inventoryCardImageNotExist"/>
    </div>
    <div class="round">
      <input type="checkbox" :id="product.Id" v-model="product.Selected" @change="check()"/>
      <label :for="product.Id"></label>
    </div>
    <div v-if="product.Selected" class="leftCorner"></div>
    <p v-if="product.Selected" class="hold">HOLD</p>
    <div v-if="product.Selected" class="holdActive"></div>
    <div class="inventoryCardInfo">
      <p class="inventoryCardText">Product Price: {{product.ProductPrice}}</p>
      <p class="inventoryCardText">Product Name: {{product.Name}}</p>
      <p class="inventoryCardText">Rank: {{product.Rank}}</p>
      <p class="inventoryCardText">Status: {{product.CurrentStatus}}</p>
      <p class="inventoryCardText">Model Number: {{product.ModelNumber}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    check: function () {
      this.$store.commit('updateSelected', 1)
      this.$store.commit('updateProduct', this.product)
    }
  }
}
</script>
