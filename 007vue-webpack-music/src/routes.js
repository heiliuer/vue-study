/**
 * Created by Heiliuer on 2016/11/2 0002.
 */
import AboutMe from "./views/AboutMe.vue";
import Home from "./views/Home.vue";
import Player from "./views/Player.vue"
export default [
    {path: '/', redirect: {name: 'home'}},
    {name: "home", path: '/home', component: Home},
    {path: '/about', component: AboutMe}
]