/**
 * Created by Administrator on 2016/10/31.
 */

import Vue from "vue"
import routes from './routes'
import VueRouter from 'vue-router'
import App from './App.vue'
import titleSetter from './directives/titleSetter'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    // console.log("beforeEach", to, from, next);

    if (to == "/##prev") {
        router.go(-1)
    } else {
        next()
    }
})

Vue.directive(titleSetter.name, titleSetter.directive)

window.ROUTER = router

const app = new Vue({
    router: router,
    components: {App},
    mounted(){
        //初始化
        $.init()
    }
}).$mount("#app")



