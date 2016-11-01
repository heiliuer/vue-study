/**
 * Created by Administrator on 2016/10/31.
 */
import Vue from "vue";
import App from "./App.vue";

new Vue({
    //2.0 已经不能用html body作为app的根元素
    el: "#vue-app",
    components: {
        App
    }
});