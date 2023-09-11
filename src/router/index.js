import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserVIew.vue'),
      children: [
        { path: 'profile', name: 'user/profile', component: () => import('../views/User/ProfileView.vue'), meta: { title: '个人信息' } },
        { path: 'avatar', name: 'user/avatar', component: () => import('../views/User/AvatarView.vue'), meta: { title: '修改头像' } },
        { path: 'email', name: 'user/email', component: () => import('../views/User/EmailView.vue'), meta: { title: '修改邮箱' } },
        { path: 'password', name: 'user/password', component: () => import('../views/User/PasswordView.vue'), meta: { title: '修改密码' } },
     ],
     redirect: '/user/profile'
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/topic/add',
      name: 'addTopic',
      component: () => import('../views/TopicEditView.vue')
    }
  ]
})

export default router
