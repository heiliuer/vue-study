import PageHome from './components/PageHome.vue'
import PageTest from './components/PageTest.vue'
import PageLogin from './components/PageLogin.vue'

var indexRoutePath = "login"
export default [
  {path: '', redirect: {path: indexRoutePath}},
  {path: '/', redirect: {path: indexRoutePath}},
  {path: '/home', name: 'home', component: PageHome},
  {path: '/test', name: 'test', component: PageTest},
  {path: '/login', name: 'login', component: PageLogin}
]
