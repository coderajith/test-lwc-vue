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
        <b-button type="is-dark" @click="clearFilter">検索条件をクリア</b-button>
        <b-collapse aria-id="keywordSearch" class="panel" :open.sync="isOpenOne">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">キーワード検索</p>
            </div>
            <div>
              <b-field>
                <b-input @input="keywordSearch" v-model="keywordSearchValue" placeholder="キーワードを入力"></b-input>
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
                  <b-select placeholder="選択してください" v-model="bigType" @input="keywordSearch">
                      <option
                          v-for="option in this.$store.state.big"
                          :value="option"
                          :key="option">
                          {{ option }}
                      </option>
                  </b-select>
              </b-field>
              <b-field label="中分類">
                  <b-select placeholder="選択してください" v-model="mediumType" @input="keywordSearch">
                      <option
                          v-for="option in this.$store.state.medium"
                          :value="option"
                          :key="option">
                          {{ option }}
                      </option>
                  </b-select>
              </b-field>
              <b-field label="小分類">
                  <b-select placeholder="選択してください" v-model="smallType" @input="keywordSearch">
                      <option
                          v-for="option in this.$store.state.small"
                          :value="option"
                          :key="option">
                          {{ option }}
                      </option>
                  </b-select>
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
                <p class="inputLabel">価値価格帯（万円)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @input="keywordSearch" v-model="unitPrice[0]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @input="keywordSearch" v-model="unitPrice[1]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">幅（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @input="keywordSearch" v-model="size[0]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @input="keywordSearch" v-model="size[1]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">奥行（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @input="keywordSearch" v-model="size[2]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @input="keywordSearch" v-model="size[3]"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">高さ（mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0" @input="keywordSearch" v-model="size[4]"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999" @input="keywordSearch" v-model="size[5]"></b-input>
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
      bigType: null,
      mediumType: null,
      smallType: null,
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
      small: []
    }
  },
  created () {
    if (this.big.length === 0) {
      this.$store.dispatch('getAllTypes')
    }
  },
  computed: {
    isOpen () {
      return this.$store.state.isOpen
    }
  },
  methods: {
    toggleMenu: function () {
      this.$store.dispatch({ type: 'updateUserInfo', isOpen: !this.$store.state.isOpen })
      this.$store.commit('setIsOpen', !this.$store.state.isOpen)
    },
    clearFilter: function () {
      this.keywordSearchValue = ''
      this.bigType = null
      this.mediumType = null
      this.smallType = null
      this.specialFlg = true
      this.hold = false
      this.longOrShort = true
      this.currentStatus = [false, true, true, false]
      this.dateForFilter = []
      this.checkboxGroup = ['A', 'B', 'C', 'D', 'M', 'N', 'S', 'P', 'ランク未確定']
      this.unitPrice = [0, 9999999]
      this.size = [0, 9999999, 0, 9999999, 0, 9999999]
      this.$store.commit('keywordSearch', [
        this.keywordSearchValue,
        '',
        '',
        '',
        this.currentStatus,
        this.dateForFilter,
        this.specialFlg,
        this.hold,
        this.longOrShort,
        this.checkboxGroup,
        this.unitPrice,
        this.size
      ])
      this.$store.commit('calculateProducts')
    },
    keywordSearch: function () {
      this.$store.commit('keywordSearch', [
        this.keywordSearchValue,
        this.bigType != null ? this.bigType : '',
        this.mediumType != null ? this.mediumType : '',
        this.smallType != null ? this.smallType : '',
        this.currentStatus,
        this.dateForFilter,
        this.specialFlg,
        this.hold,
        this.longOrShort,
        this.checkboxGroup,
        this.unitPrice,
        this.size
      ])
      this.$store.commit('calculateProducts')
    }
  }
}
</script>
