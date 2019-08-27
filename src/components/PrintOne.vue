<template>
  <div class="printOneContainer">
    <div id="printableArea" class="printableAreaContainer">
      <div class="printAreaLeft">
          <div class="printAreaLeftHeader">
            <p>{{product.ProductName}}</p>
            <p>{{product.InventoryNumber}}</p>
          </div>
          <div class="printAreaLeftBody">
            <img v-if="product.Link && product.Link.length" :src="product.Link" class="printAreaLeftBodyImageTrue" alt="" onerror="this.onerror=null;"/>
            <img v-else="checked" src="../assets/image.png" class="printAreaLeftBodyImageFalse" alt="" onerror="this.onerror=null;"/>
          </div>
      </div>
      <div class="printAreaRight">
        <div class="printAreaRightHeader">
          <p>商品情報</p>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>メーカー</p>
          </div>
          <div class="printAreaRightContantRight">
            <p>{{product.ManufacturerName}}</p>
          </div>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>型番</p>
          </div>
          <div class="printAreaRightContantRight">
            <p>{{product.ModelTotal}}</p>
          </div>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>サイズ</p>
          </div>
          <div class="printAreaRightContantRight">
            <p>{{product.SizeInput !== '' ? product.SizeInput : product.Size}}</p>
          </div>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>定価</p>
          </div>
          <div class="printAreaRightContantRight flexEnd">
            <p>￥{{product.ProductFixedPrice | numeral('0,0')}}</p>
          </div>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>ランク</p>
          </div>
          <div class="printAreaRightContantRight">
            <p>U/{{product.Rank}}</p>
          </div>
        </div>
        <div class="printAreaRightContant">
          <div class="printAreaRightContantLeft">
            <p>価値価格</p>
          </div>
          <div class="printAreaRightContantRight flexEnd">
            <p>￥{{product.UnitPriceLease | numeral('0,0')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product']
}
</script>
