<template>
  <div v-bind:style="product.Allowed || product.Selected || product.EstimateSelected? 'cursor: pointer; padding: 4px;' : 'cursor: not-allowed; padding: 4px;' " class="cardDiv">
    <div class="imageContainer" @click="check()">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="inventoryCardImage" alt="" onerror="this.onerror=null;"/>
      <img v-else="product.Selected" src="../assets/image.png" class="inventoryCardImageNotExist" alt="" onerror="this.onerror=null;"/>
    </div>
    <div class="round" @click="isImageModalActive = true">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div v-if="product.Hold && !product.NotShowHold" class="leftCorner"></div>
    <p v-if="product.Hold && !product.NotShowHold" class="hold">HOLD</p>
    <div v-if="product.Hold && !product.NotShowHold" class="holdActive" @click="moveToPage()"></div>
    <div class="inventoryCardInfo">
      <div class="inventoryCardText" style="min-height: 30px;">
        <div style="display:flex;justify-content: space-between;">
          <a class="link" href="#" @click="moveToPage()">
            {{product.InventoryNumber}}
          </a>
          <div v-if="product.Mainte" @click="check()" class="infoRed">メンテ中</div>
        </div>
      </div>
      <p class="inventoryCardText" @click="check()">{{product.ProductName}}</p>
      <p class="inventoryCardText" @click="check()">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="inventoryCardText" @click="check()">{{product.Rank}} / 定: {{product.ProductFixedPrice | numeral('0,0')}} 計: {{product.UnitPriceLease | numeral('0,0')}}</p>
      <p class="inventoryCardText" @click="check()">{{product.ManufacturerName}}</p>
      <p class="inventoryCardText" @click="check()">{{product.Size}}</p>
      <p v-if="showFields" class="inventoryCardText" @click="check()">仕: {{product.PurchaseRate}}% 回: {{product.RecoveryRate}}%</p>
    </div>
    <b-modal :active.sync="isImageModalActive">
      <div class="modalContainer">
        <div class="modalHeader">
          <p>
            {{product.InventoryNumber}} {{product.ProductName}}
          </p>
        </div>
        <div class="modalBody">
          <div style="display: flex;">
            <div class="leftContainer">
              <img v-if="product.LinkPreview && product.LinkPreview.length" :src="product.LinkPreview" class="selectedInventoryCardImage500" alt="" onerror="this.onerror=null;"/>
              <img v-else="checked" src="../assets/image.png" class="selectedInventoryCardImageNotExist500" alt="" onerror="this.onerror=null;"/>
            </div>
            <div class="rightContainer">
              <div class="conteinerImageRight">
                <div :class="[image === product.LinkPreview ? 'imageContainerRightGreenSelected' : 'imageContainerRight']" v-for="image in product.Links">
                  <img :src="image" class="images" @click="selectImage(image)" alt="" onerror="this.onerror=null;"/>
                </div>
              </div>
            </div>
          </div>
          <div class="infoTextContainer">
            <p>
              商品状態: {{product.Remark}}
            </p>
            <p>
              見積番号: <a class="linkEstimate link" href="#" @click="moveToEstimatePage()">{{product.EstimateName}}</a>
            </p>
          </div>
        </div>
        <div class="modalFooter">
          <div class="modalBtnContainer">
            <b-button @click="isImageModalActive = false" class="whiteButton" style="margin-right: 0.5rem;">キャンセル</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['product'],
  data () {
    return {
      isImageModalActive: false
    }
  },
  watch: {
    'isImageModalActive': function (val, oldVal) {
      this.product.LinkPreview = this.product.Link
      this.$store.commit('updateProduct', this.product)
    }
  },
  computed: {
    showFields () {
      return this.$store.state.showFields
    }
  },
  methods: {
    check: function () {
      if (!this.product.Selected && this.product.Allowed) {
        this.product.Hold = true
        if (this.$store.state.quote !== null) {
          this.product.Estimate = this.$store.state.quote
          this.product.EstimateName = this.$store.state.quoteName
          this.product.EstimateSelect = true
          this.product.EstimateSelected = true
          this.$store.dispatch({type: 'updateProductEstimate', estimateId: this.product.Estimate, productId: [this.product.Id]})
        }
        this.product.Selected = !this.product.Selected
        this.$store.commit('updateProduct', this.product)
        this.$store.commit('updateSelected', 1)
        this.isImageModalActive = false
        let productsQuote = this.$store.state.productsQuote
        productsQuote.push(this.product)
        this.$store.commit('setProductsQuote', productsQuote)
        this.$store.commit('setProductsQuoteSize', this.$store.state.productsQuoteSize + 1)
        this.$store.dispatch({type: 'getInventoryProductsWithSet', setId: this.product.SetId, estimateId: this.product.Estimate, productId: this.product.Id})
      }
    },
    navigateToDetails: function () {
      this.$store.dispatch({ type: 'navigateToRecord', productId: this.product.Id })
    },
    moveToPage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.product.Id })
    },
    moveToEstimatePage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.product.Estimate })
    },
    selectImage: function (imageLink) {
      this.product.LinkPreview = imageLink
      this.$store.commit('updateProduct', this.product)
    },
    returnDefaultLink: function () {
      this.product.LinkPreview = this.product.Link
      this.$store.commit('updateProduct', this.product)
    }
  }
}
</script>
