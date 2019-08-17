import Vue from 'vue'
import Router from 'vue-router'
import InnventorySearchPage from '@/components/InnventorySearchPage'
import PrintOne from '@/components/PrintOne'
import PrintMany from '@/components/PrintMany'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InnventorySearchPage',
      component: InnventorySearchPage
    },
    {
      path: '/PrintOne',
      name: 'PrintOne',
      component: PrintOne
    },
    {
      path: '/PrintMany',
      name: 'PrintMany',
      component: PrintMany
    }
  ]
})
