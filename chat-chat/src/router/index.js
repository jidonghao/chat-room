import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "@/components/HelloWorld"
import ElementUI from "element-ui";

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: ()=> import("../views/login/login")
    },
    {
      path:'/register',
      name:'register',
      component: ()=> import("../views/login/register")
    },
    {
      path: '/',
      name: 'chatRoom',
      component: ()=> import("../views/chatRoom/chatRoom")
    },
    {
      path: '/room',
      name: 'room',
      component: ()=> import("../views/chatRoom/room")
    },
    {
      path: '/my',
      name: 'my',
      component: ()=> import("../views/my/my")
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : ""
  if ((to.name !== 'login'&&to.name !== 'register') && !localStorage.getItem("isLogin")) {
    next({name: 'login', params: {err: '还未登录', errCode: 0, data:to.name}})
  } else {
    next()
  }
})

export default router
