// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import routes from "./routes"
import VueRouter from "vue-router"
import mock from "./mock"
import VueResource from "vue-resource"
import utils from "./utils/common.utils"

if (process.env.NODE_ENV == "development") {
  mock()
}

Vue.filter('date', function (time, format) {
  return utils.formatDate(time, format)
})

Vue.use(VueRouter)
Vue.use(VueResource)
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log("beforeEach", to, from, next);
  next()
})

window.ROUTER = router

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: {App}
})


