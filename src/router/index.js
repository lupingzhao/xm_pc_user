import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: '/Login',
    component: () => import('../views/login/Login'),
    meta: {
      title: "登陆",
      index: '/Login',
    }
  },
  {
    path: '/My',
    name: '/My',
    component: () => import('../views/my/My'),
    meta: {
      title: "我的",
      index: '/My',
    }
  },
  {
    path: '/Car',
    name: '/Car',
    component: () => import('../views/car/Car'),
    meta: {
      title: '购物车',
      index: '/Car',
    }
  },
  {
    path: '/Order',
    name: '/Order',
    component: () => import('../views/order/Order'),
    meta: {
      title: '订单结算',
      index: '/Order',
    }
  },

  // {
  //   path: '/Registered',
  //   name: '/Registered',
  //   component: () => import('../views/login/registered/Registered.vue'),
  //   meta: {
  //     title: "注册",
  //     index: '/Registered'
  //   }
  // },
  {
    path: '',
    component: Layout,
    children: [
      // 首页
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: "首页",
          index: '/'
        }
      },
      // 搜搜
      {
        path: '/Seach',
        name: 'Seach',
        component: () => import('../views/seach/Seach.vue'),
        meta: {
          title: "搜索相关产品",
          index: '/Seach'
        }
      },
      // 详情
      {
        path: '/Details',
        name: 'Details',
        component: () => import('../views/details/Details.vue'),
        meta: {
          title: "商品详情",
          index: '/Details'
        }
      },
    ]

  },

  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '页面不存在',
      index: '*',

    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 网页标题
  document.title = to.meta.title
  next()
})
export default router
