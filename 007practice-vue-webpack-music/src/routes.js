/**
 * Created by Heiliuer on 2016/11/2 0002.
 */
import AboutMe from "./views/AboutMe.vue";
import Home from "./views/Home.vue";
import PanelRank from "./views/PanelRank.vue";
import PanelSearch from "./views/PanelSearch.vue"
import RankDetail from "./views/RankDetail.vue"

export default [
    {path: '', redirect: {path: '/home'}},
    {path: '/', redirect: {path: '/home'}},
    {
        name: "home", path: '/home', component: Home,
        children: [
            {path: '', components: {tab1: PanelSearch, tab2: PanelRank}},
            {path: 'rankDetail', components: {tab1: PanelSearch, tab2: RankDetail}}
        ]
    },
    {path: '/about', component: AboutMe}
]