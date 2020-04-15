import layout from '@/pages/layout/layout'

// login
export const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/pages/login/login')
}

// 主页面
export const mainRouter = {
  path: '',
  name: 'home',
  redirect: '/home',
  component: layout,
  meta: {
    requireAuth: true
  },
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/pages/home/home')
    }
  ]
}

// 侧边导航栏
export const navRouter = [
  {
    path: '/tables',
    name: 'tables',
    component: layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: () => import('@/pages/tables/basic')
      },
      {
        path: 'filter',
        name: 'filter',
        component: () => import('@/pages/tables/filter')
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/pages/tables/sort')
      }
    ]
  },
  {
    path: '/charts',
    name: 'charts',
    component: layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/pages/charts/bar')
      },
      {
        path: 'line',
        name: 'line',
        component: () => import('@/pages/charts/line')
      },
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/pages/charts/pie')
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: layout,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/pages/users/user')
      }
    ]
  },
  {
    path: '/optionsNews',
    name: 'optionsNews',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/optionNews/optionsNews')
      }
    ]
  }
]

export const routes = [
  login,
  mainRouter,
  ...navRouter
]