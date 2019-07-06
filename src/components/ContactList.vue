<template>
  <div>
    <div class="slds-page-header slds-page-header_vertical">
      <div class="slds-media slds-has-divider_bottom-space">
        <div class="slds-media__body">
          <h1 class="slds-page-header__title">Contact List Component</h1>
        </div>
      </div>
      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <router-link :to="contact.id">{{ contact.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    contacts () {
      return this.$store.state.contacts
    }
  },
  created () {
    if (!this.contacts) {
      this.$store.dispatch('getAllContacts')
    }
  }
}
</script>
