import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/js/util'


import login from '@/pages/login/login.vue'
import home from '@/pages/home/home.vue'
import viewEdit from '@/pages/viewEdit/viewEdit.vue'
import infoEdit from '@/pages/infoEdit/infoEdit.vue'
import marketControl from '@/pages/marketControl/marketControl.vue'
import addView from '@/pages/addView/addView.vue'
import infoSreach from '@/pages/infoSreach/infoSreach.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/viewEdit',
      name: 'viewEdit',
      component: viewEdit
    },
    {
      path: '/infoEdit',
      name: 'infoEdit',
      component: infoEdit
    },
    {
      path: '/marketControl',
      name: 'marketControl',
      component: marketControl
    },
    {
      path: '/addView',
      name: 'addView',
      component: addView
    },
    {
      path: '/infoSreach',
      name: 'infoSreach',
      component: infoSreach
    }
  ],
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'


router.beforeEach((to, from, next) => {
  // next();
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else{
    // 已登录且要跳转的页面是登录页
    if (store.state.info.hasGetInfo) {
      next()
    } else {
      store.dispatch('setUserInfo').then(res => {
        if (res.code != 0) {
          next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
          })
          return
        }
        next()
      })
    }
  }
})



export default router