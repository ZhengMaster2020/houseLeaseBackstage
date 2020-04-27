import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "./views/Main.vue"
import Login from './views/Login.vue'

import HousesEdit from "./views/HouseEdit.vue"
import HousesList from "./views/HouseList.vue"

import HousesAddEdit from "./views/HouseAddEdit.vue"
import HousesAddList from "./views/HouseAddList.vue"

import  AdEdit  from "./views/AdEdit.vue"
import  AdList  from "./views/AdList.vue"

import  AdminEdit  from "./views/AdminEdit.vue"
import  AdminList  from "./views/AdminList.vue"

import  UserEdit  from "./views/UserEdit.vue"
import  UserList  from "./views/UserList.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
  path: '/',
  name: 'main',
  component: Main,
  children: [
    {path: '/add/create',component: HousesAddEdit},
    {path: '/add/edit/:id',component: HousesAddEdit,props:true},
    {path: '/add/list',component: HousesAddList},

    {path: '/houses/create',component: HousesEdit},
    {path: '/houses/edit/:id',component: HousesEdit,props:true},
    {path: '/houses/list',component: HousesList},

    {path: "/ads/create", component: AdEdit},
    {path: "/ads/edit/:id", component: AdEdit,props:true},
    {path: "/ads/list", component: AdList},

    {path: "/admin_users/create", component: AdminEdit},
    {path: "/admin_users/edit/:id", component: AdminEdit,props:true},
    {path: "/admin_users/list", component: AdminList},

    {path: "/users/create", component: UserEdit},
    {path: "/users/edit/:id", component: UserEdit,props:true},
    {path: "/users/list", component: UserList},
  ]
 }, 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router