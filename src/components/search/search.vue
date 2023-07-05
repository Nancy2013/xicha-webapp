<template>
    <div class="fcSearch">
        <div class="fcSearch-content">
            <img v-if="type == 'input'" src="@/components/images/search/search.png" alt="">
            <input v-if="type == 'input'" type="text" :placeholder="placeholder" @input="handleInput" @click="handleClick">
			<input v-if="type == 'select'" v-model="selectName" readonly type="text" :placeholder="placeholder" @input="handleInput" @click="handleClick" />
            <img v-if="type == 'select'" src="@/components/images/actionSheet/down.png" alt="">
        </div>

        <Popup v-model="isShow" position="bottom">
            <Picker :title="title || placeholder" show-toolbar :columns="options" @confirm="handleConfirm" @cancel="handleCancel"></Picker>
        </Popup>
    </div>
</template>

<script>
import { debounce } from '@/utils/common'
import { Popup, Picker } from 'vant'
export default {
	name: 'fcSearch',

    components: { Popup, Picker },
    props: {
        value: {
            type: String | Number,
            default: ""
        },
        placeholder: {
            type: String,
            default: "请输入员工姓名或手机号"
        },
        type: {
            type: String,
            default: 'input'
        },
        options: {
            type: Array,
            default: () => {
                return []
            }
		},
		title: {
			type: String,
			default: ""
		}
    },
    data() {
        return {
            componentValue: "",
			isShow: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },

    mounted() {
        this.componentValue = this.value
	},
	computed: {
		selectName() {
			for (let i = 0; i < this.options.length; i++) {
				const option = this.options[i]
				if (option.value == this.value) {
					return option.text
				}
			}
			return ""
		}
	},
    methods: {
        /**
            处理输入框输入事件
            @param { Event } event 输入事件参数
            @return
        */
		handleInput: debounce(function (event) {
            this.$emit('change', event.target.value)
        }, 500),

        /**
            点击输入框时触发
            @param 
            @return
        */
        handleClick() {
			if (this.type == 'select') {
				this.isShow = true
            }
        },
        /**
            处理select选择事件
            @param { Object } item 选择的select项
            @param { index } index 选择的select下标
            @return
        */
		handleConfirm(item, index) {
			this.isShow = false
            this.$emit('change', item.value)
        },

        /**
            点击picker取消事件
            @param 
            @return
        */
        handleCancel() {
            this.isShow = false
        },
    },

    watch: {
        value(value) {
            this.componentValue = value
        }
    }

}

</script>

<style scoped lang='scss'>
.fcSearch {
    padding: 0 0.32rem;
    .fcSearch-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.68rem;
        padding: 0 0.16rem;
        background-color: #f0f2f5;
        > img {
            width: 0.34rem;
            height: 0.36rem;
        }
        > input {
            margin-left: 0.12rem;
            flex: 1;
            border: none;
            font-size: 0.28rem;
            background-color: #f0f2f5;
        }
        input::-webkit-input-placeholder {
            color: #999;
        }
        input::-moz-placeholder {
            color: #999;
        }
    }
}
</style>
