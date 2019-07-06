<template>
  <div>
    <div class="slds-page-header slds-page-header_vertical">
      <div class="slds-media slds-has-divider_bottom-space">
        <div class="slds-media__body">
          <h1 class="slds-page-header__title">{{ contact.name }}</h1>
        </div>
      </div>
      <div class="slds-has-divider_bottom-space">
        <dl class="slds-dl_inline">
          <dt class="slds-dl_inline__label slds-text-color_weak">Name:</dt>
          <dd class="slds-dl_inline__detail">{{ contact.name }}</dd>
          <dt class="slds-dl_inline__label slds-text-color_weak">Phone:</dt>
          <dd class="slds-dl_inline__detail">{{ contact.phone }}</dd>
          <dt class="slds-dl_inline__label slds-text-color_weak">Email:</dt>
          <dd class="slds-dl_inline__detail">{{ contact.email }}</dd>
        </dl>
      </div>
      <div>
        <router-link tag="button" class="slds-button slds-button_neutral" to="/">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contact () { return this.$store.getters.getContact(this.$route.params.contactId) }
  },
  created () {
    if (!this.$store.state.contacts) this.$store.dispatch('getAllContact')
  }
}
</script>
