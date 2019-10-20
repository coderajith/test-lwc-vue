<template>
  <div :class="[ isOpen ? 'collapsibleFilterOpen' : 'collapsibleFilter' ]">
    <div v-if="isOpen">
      <div class="collapsibleHeader">
        <p class="collapsibleHeaderText">検索条件</p>
        <div style="padding: 24px;">
          <font-awesome-icon icon="arrow-right" @click="toggleMenu" style="width: 16px !important; height: 16px !important; color: black;"/>
        </div>
      </div>
      <div class="collapsibleContent">
        <b-button type="is-dark" @click="clearFilter">検索条件を初期状態に戻す</b-button>
        <b-collapse aria-id="keywordSearch" class="panel" :open.sync="isOpenOne">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">キーワード検索</p>
            </div>
            <div>
              <b-field>
                <b-input @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="keywordSearchValue" placeholder="キーワードを入力"></b-input>
              </b-field>
            </div>
        </b-collapse>
        <b-collapse aria-id="category" class="panel" :open.sync="isOpenSecond">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">カテゴリ</p>
            </div>
            <div>
              <b-field label="大分類">
                  <v-select v-model="bigType" :options="bigTypeValue" :clearable="false" :searchable="false" @input="keywordSearchBig"></v-select>
              </b-field>
              <b-field label="中分類">
                  <v-select v-model="mediumType" :options="mediumTypeValue" :clearable="false" :searchable="false" @input="keywordSearchMedium"></v-select>
              </b-field>
              <b-field label="小分類">
                  <v-select v-model="smallType" :options="smallTypeValue" :clearable="false" :searchable="false" @input="keywordSearch"></v-select>
              </b-field>
            </div>
        </b-collapse>
        <b-collapse aria-id="basicConditions" class="panel" :open.sync="isOpenThree">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">基本条件</p>
            </div>
            <div>
              <p class="inputLabel">現状区分（現状補助区分)</p>
              <div style="max-width: 290px;">
                  <b-checkbox style="width: 200px; padding-bottom: 8px;" v-model="currentStatus[0]" @input="keywordSearch">発注済</b-checkbox>
                  <b-checkbox style="width: 200px; padding-bottom: 8px;" v-model="currentStatus[1]" @input="keywordSearch">在庫 （入庫済／入庫ﾁｪｯｸ済)</b-checkbox>
                  <b-checkbox style="width: 200px; padding-bottom: 8px;" v-model="currentStatus[2]" @input="keywordSearch">リース中（返却予定)</b-checkbox>
                  <b-checkbox style="width: 200px; padding-bottom: 8px;" v-model="currentStatus[3]" @input="keywordSearch">リース中（返却予定以外)</b-checkbox>
              </div>
              <div>
                <p class="inputLabel">入庫予定日</p>
                <div style="display: flex;">
                  <date-picker id="dateOne" v-model="dateForFilter[0]" :lang="lang" valueType="format" format="YYYY/MM/DD" placeholder="YYYY/MM/DD" @input="keywordSearch"></date-picker>
                  <p class="inputHelp"> ~ </p>
                  <date-picker id="dateSecond" v-model="dateForFilter[1]" :lang="lang" valueType="format" format="YYYY/MM/DD" placeholder="YYYY/MM/DD" @input="keywordSearch"></date-picker>
                </div>
              </div>
            </div>
            <div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">スペシャル商品を含む</p>
                <b-switch v-model="specialFlg" @input="keywordSearch"></b-switch>
              </div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">短期専用品を含む</p>
                <b-switch v-model="longOrShort" @input="keywordSearch"></b-switch>
              </div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">HOLD済を含む</p>
                <b-switch v-model="hold" @input="keywordSearch"></b-switch>
              </div>
            </div>
        </b-collapse>
        <b-collapse aria-id="noneDiscount" class="panel" :open.sync="isOpenFour">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">こだわり条件</p>
            </div>
            <div>
              <p class="inputLabel">ランク</p>
              <div style="max-width: 290px;">
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="A">A</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="B">B</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="C">C</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="D">D</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="M">M</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="N">N</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="S">S</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="P">P</b-checkbox>
                  <b-checkbox style="width: 130px;" @input="keywordSearch" v-model="checkboxGroup" native-value="ランク未確定">ランク未確定</b-checkbox>
              </div>
              <div>
                <p class="inputLabel">計算価値価格（万円)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="unitPrice[0]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="unitPrice[1]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">幅（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[0]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[1]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">奥行（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[2]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[3]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">高さ（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[4]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @blur="keywordSearch" @keyup.native.enter="keywordSearch" v-model="size[5]"></b-input>
                  </b-field>
                </div>
              </div>
            </div>
        </b-collapse>
      </div>
    </div>
    <div v-else="menuOpen" style="padding: 24px;">
      <font-awesome-icon icon="arrow-left" @click="toggleMenu" style="width: 16px !important; height: 16px !important; color: black;"/>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
DatePicker.methods.displayPopup = function () {
  if (this.$el.id === 'dateOne') {
    this.position = {
      left: 0
    }
  } else {
    this.position = {
      right: 0
    }
  }
}
export default {
  components: { DatePicker },
  data () {
    return {
      lang: {
        days: ['日', '月', '火', '水', '木', '金', '土']
      },
      keywordSearchValue: '',
      bigType: 'All',
      mediumType: 'All',
      smallType: 'All',
      currentStatus: [false, true, true, false],
      dateForFilter: [],
      specialFlg: true,
      hold: false,
      longOrShort: true,
      checkboxGroup: ['A', 'B', 'C', 'D', 'M', 'N', 'S', 'P', 'ランク未確定'],
      unitPrice: [0, 9999999],
      size: [0, 9999999, 0, 9999999, 0, 9999999],
      isOpenOne: true,
      isOpenSecond: true,
      isOpenThree: true,
      isOpenFour: true,
      big: [],
      medium: [],
      small: [],
      order: 'LastModifiedDate ASC',
      isOpen: true
    }
  },
  created () {
    if (this.big.length === 0) {
      this.$store.dispatch('getAllTypes')
    }
    if (localStorage.getItem('orderName') != null) {
      this.order = localStorage.getItem('orderName')
    }
    if (localStorage.getItem('dataDilter') != null) {
      let allData = JSON.parse(localStorage.getItem('dataDilter'))
      this.keywordSearchValue = allData.keywordSearchValue
      this.bigType = allData.bigType
      this.mediumType = allData.mediumType
      this.smallType = allData.smallType
      this.specialFlg = allData.specialFlg
      this.hold = allData.hold
      this.longOrShort = allData.longOrShort
      this.currentStatus = allData.currentStatus
      this.dateForFilter = allData.dateForFilter
      this.checkboxGroup = allData.checkboxGroup
      this.unitPrice = allData.unitPrice
      this.size = allData.size
    } else {
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    }
    if (localStorage.getItem('rightBar') != null) {
      this.isOpen = JSON.parse(localStorage.getItem('rightBar'))
      this.$store.commit('setIsOpenFilter', this.isOpen)
    } else {
      localStorage.setItem('rightBar', JSON.stringify(this.isOpen))
      this.$store.commit('setIsOpenFilter', this.isOpen)
    }
  },
  computed: {
    isOpen () {
      return this.isOpen
    },
    bigTypeValue () {
      let bigTypes = ['All']
      this.$store.state.types.forEach((type) => {
        bigTypes.push(type.BigType__c)
      })
      return bigTypes.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    },
    mediumTypeValue () {
      let mediumTypes = ['All']
      this.$store.state.types.forEach((type) => {
        if (type.BigType__c === this.bigType && type.MediumType__c !== undefined) {
          mediumTypes.push(type.MediumType__c)
        }
      })
      return mediumTypes.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    },
    smallTypeValue () {
      let smallTypes = ['All']
      this.$store.state.types.forEach((type) => {
        let bigType = type.BigType__c === this.bigType
        let mediumType = type.MediumType__c === this.mediumType
        if (bigType && mediumType && type.SmallType__c !== undefined) {
          smallTypes.push(type.SmallType__c)
        }
      })
      return smallTypes.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    }
  },
  methods: {
    toggleMenu: function () {
      this.isOpen = !this.isOpen
      localStorage.setItem('rightBar', JSON.stringify(this.isOpen))
      this.$store.commit('setIsOpenFilter', this.isOpen)
    },
    clearFilter: function () {
      this.$store.commit('setSpinner')
      this.$store.commit('setCurrentPage', 1)
      this.keywordSearchValue = ''
      this.bigType = 'All'
      this.mediumType = 'All'
      this.smallType = 'All'
      this.specialFlg = true
      this.hold = false
      this.longOrShort = true
      this.currentStatus = [false, true, true, false]
      this.dateForFilter = []
      this.checkboxGroup = ['A', 'B', 'C', 'D', 'M', 'N', 'S', 'P', 'ランク未確定']
      this.unitPrice = [0, 9999999]
      this.size = [0, 9999999, 0, 9999999, 0, 9999999]
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShort: this.longOrShort,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: 0
      })
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    },
    keywordSearch: function () {
      this.$store.commit('setSpinner')
      this.$store.commit('setCurrentPage', 1)
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShort: this.longOrShort,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: 0
      })
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    },
    keywordSearchBig: function () {
      this.$store.commit('setSpinner')
      this.$store.commit('setCurrentPage', 1)
      this.mediumType = 'All'
      this.smallType = 'All'
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShort: this.longOrShort,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: 0
      })
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    },
    keywordSearchMedium: function () {
      this.$store.commit('setSpinner')
      this.$store.commit('setCurrentPage', 1)
      this.smallType = 'All'
      this.$store.dispatch('getInventoryProductsWithFilter', {
        keywordSearchValue: this.keywordSearchValue,
        bigType: this.bigType !== 'All' ? this.bigType : '',
        mediumType: this.mediumType !== 'All' ? this.mediumType : '',
        smallType: this.smallType !== 'All' ? this.smallType : '',
        currentStatus: this.currentStatus,
        dateForFilter: this.dateForFilter,
        specialFlg: this.specialFlg,
        hold: this.hold,
        longOrShort: this.longOrShort,
        checkboxGroup: this.checkboxGroup,
        unitPrice: this.unitPrice,
        size: this.size,
        orderName: this.order,
        offsetSize: 0
      })
      localStorage.setItem('dataDilter', JSON.stringify(this.$data))
    }
  }
}
</script>
