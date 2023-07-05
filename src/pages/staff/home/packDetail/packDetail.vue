<template>
    <FcPage title="二次包装详情">
        <div class="complateConfirm-secondaryPackaging">
            <div class="complateConfirm-secondaryPackaging-item whiteBg" v-for="(renderItem, renderKey) in renderFormList" :key="renderKey">
                <FcForm disabled :renderList="renderItem" v-model="formDataList[renderKey]"></FcForm>
            </div>
        </div>
    </FcPage>
</template>

<script>
import FcForm from '@/components/form/form.vue'
import { renderFormConfig } from '../complateConfirm/config'
import { workTypeDict } from '@/utils/dict'
export default {
    name: 'packDetail',
    components: {FcForm},

    data() {
		return {
			renderFormList: [],
			formDataList: []
		}
    },

	created() { 
		const { id } = this.$route.query
		this.getSecondPackageInfo(id)
	},

	methods: {
		/**
         * 获取二次包装详情
         * @param { String } id 工单id
         * @return
         */
		getSecondPackageInfo(id) {
			this.$axios({
                url: '/teaSettle/getSecondPackageInfo',
                method: 'GET',
                data: { workId: id }
			}).then((res) => {
				if (Array.isArray(res.data.secondPackageList) && res.data.secondPackageList.length) {
					for (let i = 0; i < res.data.secondPackageList.length; i++) {
						const packageItem = res.data.secondPackageList[i]
						this.formDataList.push({
							idisCode: [packageItem.idisCode],
							idisCodeList: packageItem.idisCodeList
						})
						const renderFormItem = renderFormConfig[workTypeDict.secondaryPackaging]
						renderFormItem[0].remark = res.data.packageName
						this.renderFormList.push(renderFormItem)
					}
				}
			})
		}
	},

}

</script>

<style scoped lang='scss'>
.complateConfirm-secondaryPackaging {
    padding-bottom: 0.4rem;
}
.complateConfirm-secondaryPackaging-item {
    margin-bottom: 0.2rem;
}
</style>