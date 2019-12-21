import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/intercept'
import component from './components/index'

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
