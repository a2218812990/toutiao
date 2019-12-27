import layoutAside from './home/layoutAside.vue'
import layoutheader from './home/layoutheader.vue'
import breadcrumb from './breadcrumb/breadcrumb.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {

  install (Vue) {
    Vue.component('layoutAside', layoutAside)
    Vue.component('layoutheader', layoutheader)
    Vue.component('breadcrumb', breadcrumb)
    Vue.component('quill-editor', quillEditor)
  }

}
