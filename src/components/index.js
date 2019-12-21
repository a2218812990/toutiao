import layoutAside from './home/layoutAside.vue'
import layoutheader from './home/layoutheader.vue'

export default {

  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutheader', layoutheader)
  }

}
