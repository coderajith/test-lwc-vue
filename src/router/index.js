import Vue from 'vue'
import Router from 'vue-router'
import ContactDetail from '@/components/ContactDetail'
import InnventorySearchPage from '@/components/InnventorySearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InnventorySearchPage',
      component: InnventorySearchPage
    },
    {
      path: '/:contactId',
      name: 'ContactDetail',
      component: ContactDetail
    }
  ]
})
