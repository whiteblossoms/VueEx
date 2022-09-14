import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import myRequest from './service'
import './assets/css/index.less'
import App from './App.vue'
import store from './store'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { globalRegister } from './global/index'
import { setupStore } from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

const app = createApp(App)
for (const obj of Object.entries(ElementPlusIconsVue)) {
  app.component(obj[0], obj[1])
}

app.use(store)
setupStore()
app.use(router)
app.use(globalRegister)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)

// myRequest
//   .request<string>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res)
//   })
