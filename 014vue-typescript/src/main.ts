import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

let preLoadPromise = Promise.resolve()
if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    preLoadPromise = import(/* vconsole */'vconsole').then(({default: VConsole}) => {
        /*eslint-disable*/
        new VConsole()
    })
}

preLoadPromise.then(() => {
    new Vue({
        store,
        router,
        render: (h) => h(App)
    }).$mount('#app')
})
