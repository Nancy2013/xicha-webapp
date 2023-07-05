// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/flexible'
import './index.css'
import { requestApi } from './utils/axios'
import FcDialog from '@/components/dialog/dialog.vue'
import FcPage from '@/components/page/page.vue'
import dialog from '@/components/$dialog'
import { Toast, Lazyload } from 'vant';
import { getWeChatSignData } from '@/utils/wechat'
Vue.use(Lazyload);
Vue.component('FcDialog', FcDialog)
Vue.component('FcPage', FcPage)

Vue.prototype.$dialog = dialog
Vue.prototype.$axios = requestApi
Vue.prototype.$toast = Toast


/**
  初始化微信
  @param
  @return
*/
export const initWeChat = () => {
  return new Promise((resolve, reject) => {
    getWeChatSignData(["scanQRCode", "getLocation"]).then(() => {
      Vue.prototype.$isReadyWeChat = true
      resolve()
    }).catch(() => {
      Vue.prototype.$isReadyWeChat = false
      reject()
    })
  })
}



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
