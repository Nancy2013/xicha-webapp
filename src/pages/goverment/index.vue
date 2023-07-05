<template>
    <div class="goverment">
        <Home v-if="tabIndex == 'home' || loadTabData.home" v-show="tabIndex == 'home'"  @hook:mounted="handleChildMounted('home')" @goApp="goApp"></Home>
        <!-- <App v-if="tabIndex == 'app' || loadTabData.app" v-show="tabIndex == 'app'" @hook:mounted="handleChildMounted('app')"></App>
        <My v-if="tabIndex == 'my' || loadTabData.my" v-show="tabIndex == 'my'" @hook:mounted="handleChildMounted('my')"></My>
        <FCTabbar :renderList="tabbarRenderList" v-model="tabIndex" @change="handleChangeTab"></FCTabbar> -->
    </div>
</template>

<script>
import { getTabbarRenderList } from './config'
import Home from '@/pages/goverment/home/home.vue'
import App from '@/pages/enterprise/app/app.vue'
import My from '@/pages/enterprise/my/my.vue'
import FCTabbar from '@/components/tabbar/tabbar.vue'
import { enterpriseTabStorage } from '@/utils/storage'
export default {
    name: 'goverment',

    components: {
        FCTabbar,
        Home,
        App,
        My
    },

    data() {
        return {
          tabIndex: enterpriseTabStorage.getTabIndex() || 'home',
          loadTabData: {
             home: false,
             app: false,
             my: false
          },
          tabbarRenderList: getTabbarRenderList()
        }
    },
    created() {
        this.$set(this.loadTabData, this.tabIndex, true)
    },
    methods: {
        /**
         * 处理子组件mouted生命周期事件
         * @param { String } key 子组件的key
         * @return
         */
        handleChildMounted(key) {
            this.$set(this.loadTabData, key, true)
        },

        /**
         * 处理tab改变事件
         * @param { String } key 子组件的key
         * @return
         */
        handleChangeTab() {
             enterpriseTabStorage.setTabIndex(this.tabIndex)
        },

        /**
         * 处理子组件改变tab事件
         * @param
         * @return
         */
        goApp() {
            this.tabIndex = 'app'
        }
    }
}
</script>
<style lang="scss" scoped>
</style>