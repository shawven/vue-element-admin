import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/try/index',
    meta: {
      title: '客户列表',
      icon: 'peoples'
    },
    children: [
      {
        path: 'try/index',
        component: () => import('@/views/customer/try/index'),
        name: 'TryIndex',
        meta: { title: '试用客户', icon: 'user' }
      },
      {
        path: 'copartner/index',
        component: () => import('@/views/customer/copartner/index'),
        name: 'CopartnerIndex',
        meta: { title: '招商合作', icon: 'user' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/article/index'),
        name: 'ArticleIndex',
        meta: { title: '文章列表', icon: 'list' }
      },
      {
        path: 'category',
        component: () => import('@/views/article/category'),
        name: 'ArticleCategory',
        meta: { title: '文章分类', icon: 'tree' }
      },
      {
        path: 'create',
        component: () => import('@/views/article/create'),
        name: 'CreateArticle',
        meta: { title: '发布文章' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/article/edit'),
        name: 'EditArticle',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/article/index' },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/rbac',
    component: Layout,
    redirect: '/rbac/permission/index',
    children: [
      {
        path: 'permission/index',
        component: () => import('@/views/rbac/permission/index'),
        name: 'Permission',
        meta: { title: '权限列表', icon: 'user', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
