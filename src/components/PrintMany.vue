<template>
  <div class="printManyContainer">
    <table>
      <thead><tr><td>
        <div class="header-space">&nbsp;</div>
      </td></tr></thead>
      <tbody><tr><td>
        <div class="content">
          <div class="printManyCards">
            <div v-for="product in products" class="printManyCardsContainer">
              <div>
                <div class="printManyCardsContainerCard">
                  <img v-if="product.Link && product.Link.length" :src="product.Link" class="printManyCardsContainerCardTrue"/>
                  <img v-else="checked" src="../assets/image.png" class="printManyCardsContainerCardFalse"/>
                </div>
                <div>
                  <div class="textContainer" style="min-height: 36px; max-height: 36px;">
                    <p style="width:250px; max-width: 250px;">{{product.ProductName}}</p>
                  </div>
                  <div class="textContainer">
                    <p style="wrapDots">{{product.InventoryNumber}}</p>
                    <p class="wrapDots">U/{{product.Rank}}</p>
                  </div>
                  <div class="textContainer" style="min-height: 36px; max-height: 36px;">
                    <p class="sizeWrap">ｻｲｽﾞ: {{product.SizeInput !== '' ? product.SizeInput : product.Size}}</p>
                  </div>
                  <div class="textContainer">
                    <p class="width250">ﾒｰｶｰ名: {{product.ManufacturerName}}</p>
                  </div>
                  <div class="textContainer">
                    <p class="wrapDots">定価 ￥{{product.ProductFixedPrice | numeral('0,0')}}</p>
                    <p class="wrapDots">月額ﾘｰｽ料 ￥{{estimate !== null ? product.UnitPriceLease * estimate.MonthlyLeaseRate : 0 | numeral('0,0')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td></tr></tbody>
      <tfoot><tr><td>
        <div class="footer-space">&nbsp;</div>
      </td></tr></tfoot>
    </table>
    <div class="header">
      <div class="printManyHeader">
        <div class="printManyTitle">
          <p>商品一覧</p>
        </div>
        <div class="flexColumn">
          <div>
            <p>ﾘｰｽ期間</p>
            <p>{{estimate !== null ? estimate.LeaseMonth + ' ヶ月': ''}}</p>
          </div>
          <div>
            <p>ﾘｰｽ料率</p>
            <p>{{(estimate !== null ? estimate.MonthlyLeaseRate : 0)  | numeral('0.0')}} %</p>
          </div>
          <div>
            <p>選択商品数</p>
            <p>{{productsSize}}</p>
          </div>
          <div>
            <p>月額ﾘｰｽ料合計</p>
            <p>￥{{monthlyLease | numeral('0,0')}}</p>
          </div>
        </div>
        <div class="flexColumn">
          <div>
            <p>Date</p>
            <p style="min-width: 350px; width: 350px;">{{getToday}}</p>
          </div>
          <div>
            <p>担当者ｺｰﾄﾞ</p>
            <p style="min-width: 350px; width: 350px;">{{estimate !== null ? estimate.Created : ''}}</p>
          </div>
          <div>
            <p>顧客名</p>
            <p style="min-width: 350px; width: 350px;">{{estimate !== null ? estimate.Account : ''}}</p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div class="footerCustom">
      <div class="printManyFooter">
        <div>
          <p>株式会社 メイズ</p>
          <p>〒105-0001 東京都港区虎ノ門3-2-2虎ノ門30森ﾋﾞﾙ1階</p>
          <p>Tel:03-5402-4600　Fax:03-5402-4660</p>
        </div>
        <div class="logo">
          <img src="../assets/image.png"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['products', 'estimate'],
  computed: {
    productsSize () {
      return this.products.length
    },
    monthlyLease () {
      if (this.estimate !== null) {
        let lease = 0
        this.products.forEach((item) => {
          lease = lease + item.UnitPriceLease * this.estimate.MonthlyLeaseRate
        })
        return lease
      } else {
        return ''
      }
    },
    getToday () {
      return new Date().toJSON().slice(0, 10).replace(/-/g, '/')
    }
  }
}
</script>
