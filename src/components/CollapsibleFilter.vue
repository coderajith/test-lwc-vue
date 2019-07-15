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
        
      </div>
    </div>
    <img v-else="menuOpen"class="collapsibleIcon" @click="toggleMenu" src="../assets/left-arrow.png"/>
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
