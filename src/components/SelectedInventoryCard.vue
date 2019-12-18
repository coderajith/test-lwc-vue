<template>
  <div :class="classObject">
    <div class="selectedImageContainer" @click="select()">
      <img v-if="product.Link && product.Link.length" :src="product.Link" class="selectedInventoryCardImage" alt="" onerror="this.onerror=null;"/>
      <img v-else="checked" src="../assets/image.png" class="selectedInventoryCardImageNotExist" alt="" onerror="this.onerror=null;"/>
    </div>
    <div class="roundSelected" @click="isImageModalActive = true">
      <font-awesome-icon icon="info-circle" />
    </div>
    <div class="selectedInventoryCardInfo">
      <div class="selecytedInventoryCardText">
        <div style="display:flex;justify-content: space-between;">
          <a class="link" href="#" @click="moveToPage()">
            {{product.InventoryNumber}}
          </a>
          <div v-if="product.Mainte" @click="select()">メンテ中</div>
        </div>
      </div>
      <p class="selecytedInventoryCardText" @click="select()">{{product.ProductName}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.CurrentStatus}} / {{product.CurrentAuxiliaryStatus}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.Rank}} / 定:{{product.ProductFixedPrice | numeral('0,0')}} 計:{{product.UnitPriceLease | numeral('0,0')}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.ManufacturerName}}</p>
      <p class="selecytedInventoryCardText" @click="select()">{{product.Size}}</p>
      <p v-if="showFields" class="selecytedInventoryCardText" @click="select()">仕: {{product.PurchaseRate}} 回: {{product.RecoveryRate}}</p>
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
  data () {
    return {
      checked: false,
      isImageModalActive: false
    }
  },
  props: ['product'],
  computed: {
    classObject () {
      return this.product.SelectHold ? 'selectedInventoryCardContainer greenSelected' : 'selectedInventoryCardContainer'
    },
    showFields () {
      return this.$store.state.showFields
    }
  },
  watch: {
    'isImageModalActive': function (val, oldVal) {
      this.product.LinkPreview = this.product.Link
      this.$store.commit('updateProduct', this.product)
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
    moveToEstimatePage: function () {
      this.$store.dispatch({ type: 'navigateToEstimate', estimateId: this.product.Estimate })
    },
    navigateToDetails: function () {
      this.$store.dispatch({ type: 'navigateToRecord', productId: this.product.Id })
    },
    selectImage: function (imageLink) {
      this.product.LinkPreview = imageLink
      this.$store.commit('updateProduct', this.product)
    }
  }
}
</script>
