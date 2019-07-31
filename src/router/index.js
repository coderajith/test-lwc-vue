import Vue from 'vue'
import Router from 'vue-router'
import InnventorySearchPage from '@/components/InnventorySearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InnventorySearchPage',
      component: InnventorySearchPage
    }
  ]
})
