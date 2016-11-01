/**
 * Created by Heiliuer on 2016/11/2 0002.
 */
import AboutMe from "./AboutMe.vue";
import App from "./App.vue";

const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

export default [
    {path: '/', component: Foo},
    {path: '/bar', component: Bar},
    {path: '/App', component: App},
    {path: '/about', component: AboutMe}
]