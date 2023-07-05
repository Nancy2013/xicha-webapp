<template>
    <div :class="`workOrderRow workOrderRow-${type}`" v-if="!isHide">
        <div class="workOrderRow-label">{{ label }}</div>
        <div class="workOrderRow-content">
            <template v-if="type === 'text'">
                <span v-if="filterType === 'date'">{{ value | filtersDate }}</span>
                <span v-else>{{ value }}{{ suffixText }}</span>
            </template>
            <template v-if="type === 'textarea'">
                <div>{{ value }}</div>
            </template>
            <template v-if="type === 'img'">
                <div v-if="Array.isArray(imgList)">
                    <div v-for="(imgSrc, key) in imgList" :key="key" class="workOrderRow-imgItem" @click="previewImage(key)">
                        <img :src="imgSrc" alt="" />
                    </div>
                </div>
                <!-- <div v-if="!Array.isArray(value)" class="workOrderRow-imgItem" @click="previewImage">
                    <img :src="value" alt="" />
                </div> -->
            </template>
            <template v-if="type === 'code'">
                <div class="workOrderRow-imgItem">
                    <FcCodeToQrcode width="1.56rem" height="1.56rem" :code="value"></FcCodeToQrcode>
                </div>
            </template>
            <template v-if="type === 'codes'">
                <div class="workOrderRow-imgs">
                    <div class="workOrderRow-imgItem" v-for="(item, index) in value" :key="index">
                    <FcCodeToQrcode width="1.56rem" height="1.56rem" :code="item"></FcCodeToQrcode>
                   </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import FcCodeToQrcode from '../codeToQRcode/codeToQRcode.vue'
import { ImagePreview } from 'vant'
import { isEmpty } from '@/utils/common'
import dayjs from 'dayjs'
export default {
    name: 'workOrderRow',

    components: {
        FcCodeToQrcode
    },
    props: {
        type: {
            type: String,
            default: "text"
        },
        data: {
            type: Object,
            default: () => { }
        },
        label: {
            type: String,
            default: ""
        },
        value: {
            type: String | Number,
            default: ""
        },
        isHide: {
            type: Boolean,
            default: false
        },
        filterType: {
            type: String,
            default: ""
        },
        suffixText: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            imgList: []
        }
    },
    filters: {
        filtersDate(value) {
            if (isEmpty(value)) {
                return ""
            } else {
                return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    },

    mounted() {
        if (this.type == 'img') {
            if (Array.isArray(this.value)) {
                this.imgList = this.value
            } else if(typeof this.value === 'string')  {
                this.imgList = this.value.split(',')
            }
        }

    },

    methods: {
        /**
            点击图片预览
            @param { Number } key 图片的下标
            @return
        */
        previewImage(key) {
            ImagePreview({
                images: this.imgList,
                startPosition: key
            })

        }
    },

}

</script>

<style scoped lang='scss'>
.workOrderRow-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .workOrderRow-content {
        max-width: 4.4rem;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;

        > span {
            font-size: 0.3rem;
            line-height: 0.56rem;
            color: #333;
        }
    }
}

.workOrderRow-textarea {
    margin-bottom: 0.12rem;

    .workOrderRow-content {
        margin-top: 0.08rem;
        padding: 0.2rem;
        border-radius: 0.04rem;
        background-color: #f7f7f7;

        > div {
            font-size: 0.3rem;
            line-height: 0.5rem;
            color: #333;
        }
    }
}
.workOrderRow-imgs {
        display: flex;
        flex-wrap: wrap;
    }
.workOrderRow-img,
.workOrderRow-code {
    margin-bottom: 0.12rem;

    .workOrderRow-content {
        

        > div {
            
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            >div {
                margin-top: 0.16rem;
            }
        }
    }
    .workOrderRow-imgItem {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.2rem;
        border: 1px solid #e1e1e1;

        div {
            height: 100%;
        }

        img {
            width: 100%;
            height: 100%;
            background-color: #e1e1e1;
        }
    }
}

.workOrderRow-label {
    font-size: 0.3rem;
    line-height: 0.56rem;
    color: #969799;
}
</style>