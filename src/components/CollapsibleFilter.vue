<template>
  <div :class="[ menuOpen ? 'collapsibleFilterOpen' : 'collapsibleFilter' ]">
    <div v-if="menuOpen">
      <div class="collapsibleHeader">
        <p class="collapsibleHeaderText">Filter</p>
        <div style="width: 60px;">
          <img class="collapsibleIcon" @click="toggleMenu" src="../assets/right-arrow.png"/>
        </div>
      </div>
      <div class="collapsibleContent">
        <b-button type="is-dark">Clear filters</b-button>
        <b-collapse aria-id="keywordSearch" class="panel" :open.sync="isOpen">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">Keyword search</p>
            </div>
            <div>
              <b-field>
                <b-input></b-input>
              </b-field>
            </div>
        </b-collapse>
        <b-collapse aria-id="category" class="panel" :open.sync="isOpen">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">Category</p>
            </div>
            <div>
              <b-field label="Major Classification">
                <b-select placeholder="Select a Target quote" >
                  <option value="newest">1</option>
                  <option value="last">2</option>
                </b-select>
              </b-field>
              <b-field label="Medium Classification">
                <b-select placeholder="Select a Target quote" >
                  <option value="newest">1</option>
                  <option value="last">2</option>
                </b-select>
              </b-field>
              <b-field label="Minor Classification">
                <b-select placeholder="Select a Target quote" >
                  <option value="newest">1</option>
                  <option value="last">2</option>
                </b-select>
              </b-field>
            </div>
        </b-collapse>
        <b-collapse aria-id="basicConditions" class="panel" :open.sync="isOpen">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">Basic Conditions</p>
            </div>
            <div>
              <div style="max-width: 290px;">
                  <b-checkbox style="width: 130px; padding-bottom: 8px;">Status</b-checkbox>
                  <b-checkbox style="width: 130px; padding-bottom: 8px;">Sub-status</b-checkbox>
              </div>
              <div>
                <p class="inputLabel">Scheduled receipt date</p>
                <div style="display: flex;">
                  <b-datepicker placeholder="YYYY/MM/DD"></b-datepicker>
                  <p class="inputHelp"> ~ </p>
                  <b-datepicker placeholder="YYYY/MM/DD"></b-datepicker>
                </div>
              </div>
            </div>
            <div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">Special product</p>
                <b-switch></b-switch>
              </div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">Short-term product</p>
                <b-switch></b-switch>
              </div>
              <div class="radioButtonWithLabel" style="padding-top: 8px;">
                <p class="inputLabel">Held product</p>
                <b-switch></b-switch>
              </div>
            </div>
        </b-collapse>
        <b-collapse aria-id="noneDiscount" class="panel" :open.sync="isOpen">
            <div slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <p class="inputBold">Non-disclosure product</p>
            </div>
            <div>
              <p class="inputLabel">More Conditions</p>
              <div style="max-width: 290px;">
                  <b-checkbox style="width: 130px;">A</b-checkbox>
                  <b-checkbox style="width: 130px;">B</b-checkbox>
                  <b-checkbox style="width: 130px;">C</b-checkbox>
                  <b-checkbox style="width: 130px;">D</b-checkbox>
                  <b-checkbox style="width: 130px;">M</b-checkbox>
                  <b-checkbox style="width: 130px;">N</b-checkbox>
                  <b-checkbox style="width: 130px;">S</b-checkbox>
                  <b-checkbox style="width: 130px;">P</b-checkbox>
              </div>
              <div>
                <p class="inputLabel">Value price range (Man-yen)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">Size, Width (mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">Depth (mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999"></b-input>
                  </b-field>
                </div>
              </div>
              <div>
                <p class="inputLabel">Height (mm)</p>
                <div style="display: flex;">
                  <b-field>
                      <b-input placeholder="0"></b-input>
                  </b-field>
                  <p class="inputHelp"> ~ </p>
                  <b-field>
                      <b-input placeholder="9999"></b-input>
                  </b-field>
                </div>
              </div>
            </div>
        </b-collapse>
      </div>
    </div>
    <div v-else="menuOpen" style="width: 60px;">
      <img class="collapsibleIcon" @click="toggleMenu" src="../assets/left-arrow.png"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu: function () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
