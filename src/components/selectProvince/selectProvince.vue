<template>
    <div :class="`select ${isError ? 'formItem-error' : ''} ${disabled?'select-disabled':''}`">
     <div class="select-content" @click="!disabled&&handleClickSelect()">
       <div class="formItem-label">
          <img v-if="required" src="@/components/images/form/require.png" alt="">
          <div>{{ label }}</div>
       </div>
       <div class="formItem-content">
          <div class="formItem-value" v-if="activeName">{{ activeName }}</div>
          <div v-else class="formItem-placeholder">{{ placeholder }}</div>
          <img class="formItem-icon" src="@/assets/common/right.png" alt="">
       </div>
     </div>
     <Popup v-model="isShow" position="bottom">
            <Area :area-list="areaList" :title="title || placeholder" show-toolbar @confirm="handleConfirm" @cancel="handleCancel" :value="districtId" />
     </Popup>
    </div>
</template>

<script>
import { Popup, Picker, Area } from 'vant';
import { areaList } from '@vant/area-data';
export default {
    name: 'FcSelectProvince',
    components: {
        Popup,
        Picker,
        Area
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            defaut: () => []
        },
        value: {
            type: String | Number,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        disabled:{
            type:Boolean,
            default:false,
        },
    },
    computed: {
        activeName() {
            if(this.value) {
                let info = this.value
               return `${info[0].name} - ${info[1].name} - ${info[2].name}`
            } 
            return ''
        },
        districtId(){
            // 默认初始化选中
            if(this.value) {
                let  districtId= this.value[2].code;
               return `${districtId}`
            }  
            return '';
        },
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isShow: false,
            isError: false,
            defaultIndex: '',
            areaList
        }
    },
    methods: {
        /**
            处理点击select事件
            @param 
            @return
        */
		handleClickSelect() {
			this.isError = false
            this.isShow = true
        },

        /**
            处理select选择事件
            @param { Object } item 选择的select项
            @return
        */
        handleConfirm(item) {
            this.isShow = false
            this.$emit('change', item)
        },
        /**
            处理poup打开事件
            @param 
            @return
        */
        handlePopupOpen() {
            if (!this.defaultIndex) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].value === this.value) {
                        this.defaultIndex = i
                    }
                }
            }
        },
        /**
            点击picker取消事件
            @param 
            @return
        */
        handleCancel() {
            this.isShow = false
        },
    }
}
</script>
<style scoped lang='scss'>
.select {
    width: 100%;
	transition: all .15s;
    .select-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.9rem;
        border-bottom: 1px solid #EEEEEE;
    }

    &.select-disabled {
    .formItem-content {
        .formItem-value {
            color: #c8c9cc;
        }
        >img {
            opacity: .8;
        }
    }
}
    
}
</style>