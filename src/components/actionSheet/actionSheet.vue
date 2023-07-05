<template>
    <div class="actionSheet">
        <div class="actionSheet-content" @click="handleShowPopup">
            <div v-if="getLabel" class="actionSheet-text">{{ getLabel }}</div>
            <div v-else class="actionSheet-placeholder">{{ placeholder }}</div>
            <img src="@/components/images/actionSheet/down.png" alt="">
        </div>
        <Popup v-model="isShow" position="bottom" :columns="options" @open="handlePopupOpen">
            <Picker show-toolbar :columns="options" :title="title" :default-index="defaultIndex" @confirm="onConfirm" @cancel="onCancel" @change="handlePickerChange"></Picker>
        </Popup>
    </div>
</template>

<script>
import { Popup, Picker } from 'vant'
export default {
    name: 'actionSheet',

    components: {
        Popup,
        Picker
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ""
        },
        options: {
            type: Array,
            default: () => {
                return []
            }
		},
		value: {
			type: String | Number,
			default: ""
		}
	},
	model: {
		prop: 'value',
		event: 'change'
	},
    data() {
        return {
            isShow: false,
            defaultIndex: ""
        }
	},

	created() {
		if (this.value) {
			for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === this.value) {
					this.defaultIndex = i
                }
            }
		}
	},

	computed: {
		getLabel() {
			for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === this.value) {
					return this.options[i].text
                }
			}
			return ""
		}
	},

    mounted() { },

    methods: {
        /**
            显示popup
            @param 
            @return
        */
        handleShowPopup() {
            this.isShow = true
        },


        /**
            处理picker选择事件
            @param { Object } item 选择的select项
            @param { index } index 选择的select下标
            @return
        */
        onConfirm(item, index) {
            this.isShow = false
            this.$emit('change', item.value)
        },

        /**
            picker点击取消时触发
            @param 
            @return
        */
        onCancel() {
            this.isShow = false
		},

		/**
            处理picker选择事件
            @param { Object } item 选择的select项
            @param { index } index 选择的select下标
            @return
        */
		handlePickerChange(dom, item, index) {
			this.defaultIndex = index
		},

        /**
            处理poup打开事件
            @param 
            @return
        */
        handlePopupOpen() {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value == this.value) {
                    this.defaultIndex = i
                }
            }
        }
    },

}

</script>

<style scoped lang='scss'>
.actionSheet-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
    height: 0.76rem;
    padding-left: 0.32rem;
    border-radius: 0.08rem;
    background-color: #f6f6f6;
    > img {
        position: absolute;
        width: 0.28rem;
        height: 0.28rem;
        right: 0.32rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
    .actionSheet-placeholder {
        color: rgba(21, 21, 21, 0.35);
    }
}
</style>