/**
 * Created by Administrator on 2016/10/31.
 */
import Vue from "vue"
import routers from './routers'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

console.log(routers);

const router = new VueRouter({
    routers
})

router.beforeEach((to, from, next) => {
    console.log("beforeEach",to, from, next)
})

const app = new Vue({
    router
}).$mount("#vue-app")
