import Vue from 'vue'
import Router from 'vue-router'
import ContactList from '@/components/ContactList'
import ContactDetail from '@/components/ContactDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContactList',
      component: ContactList
    },
    {
      path: '/:contactId',
      name: 'ContactDetail',
      component: ContactDetail
    }
  ]
})
