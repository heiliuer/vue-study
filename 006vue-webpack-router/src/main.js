/**
 * Created by Administrator on 2016/10/31.
 */
import Vue from "vue"
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

console.log(routes);

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    console.log("beforeEach", to, from, next);
    next();
})

const app = new Vue({
    router
}).$mount("#vue-app")
