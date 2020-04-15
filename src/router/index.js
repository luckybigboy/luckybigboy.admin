import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const routerConfig = {
  routes,
  mode: 'history'
}

const router = new VueRouter(routerConfig)

export default router