<template>
    <div :class="`upload upload-${formKey} ${isError ? 'formItem-error' : ''}`">
        <div class="upload-content">
            <div class="formItem-label" v-if="label">
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
                <div>{{ label }}</div>
                <span v-if="required">*</span>
            </div>
            <div v-if="!multiple" :class="`formItem-content ${uploadList.length == 1 ? 'formItem-upload-one' : '' }`">
                <div class="formItem-content-item" v-for="(item, index) in getUploadList" :key="index">
                    <div class="formItem-uploader">
                        <img key="0" class="uploader-img" v-if="item.img" :src="item.img" @click="previewImg(`${item.img}`)" />
                        <img key="1" class="formItem-uploader-camera" v-else :src="item.overlay" @click="!disabled && imgClick(`${item.id}`)" />
                        <input :id="item.id" type="file" :name="item.id" class="file" @change="(e) => uploadChange(e, index)" style="display: none" :accept="accept">
                        <div class="formItem-uploader-delete" v-if="item.img && !disabled" @click="handleDeleteImg(index)">
                            <img src="@/assets/staff/home/agricultural/agricultural/delete.png" alt="">
                        </div>
                        <div class="formItem-uploading" v-if="item.loading">
                            <Loading size="24" color="#629B88"></Loading>
                        </div>
                    </div>
                    <div class="formItem-title">{{ item.title }}</div>
                </div>
            </div>

            <div v-if="multiple && uploadMode === 'image'" class="formItem-multiple-content">
                <div class="formItem-multiple-item" v-for="(item, key) in value" :key="key">
                    <img class="formItem-multiple-item-img" :src="item" alt="" @click="handlePreviewImg(key)">
                    <div class="formItem-multiple-item-delete" @click.stop="handleDelete(key)" v-if="!disabled">
                        <img src="@/components/images/upload/delete.png" alt="" />
                    </div>
                </div>
                <div v-if="(!max || value.length <= max) && !disabled" class="formItem-multiple-upload">
                    <img :src="overlay" alt="">
                    <div class="formItem-multiple-title">{{ title }}</div>
                    <input type="file" :accept="accept" :capture="capture" @change="handleUpload" />
                    <div class="formItem-uploading" v-if="uploading">
                        <Loading size="24" color="#629B88"></Loading>
                    </div>
                </div>
            </div>

            <div v-if="multiple && uploadMode === 'button'" class="formItem-multiple-content formItem-multiple-button-content">
                <div class="formItem-multiple-button-title">{{ title }}</div>
                <div class="formItem-multiple-list">
                    <div class="formItem-multiple-item" v-for="(item, key) in value" :key="key">
                        <img class="formItem-multiple-item-img" :src="item" alt="" @click="handlePreviewImg(key)">
                        <div class="formItem-multiple-item-delete" @click.stop="handleDelete(key)" v-if="!disabled">
                            <img src="@/components/images/upload/delete.png" alt="" />
                        </div>
                    </div>

                    <div class="formItem-multiple-upload" v-if="uploading">
                        <div class="formItem-uploading">
                            <Loading size="24" color="#629B88"></Loading>
                        </div>
                    </div>
                </div>
                <div v-if="(!max || value.length <= max) && !disabled" class="formItem-multiple-button-upload bgColor">
                    <span class="white">立即上传</span>
                    <input type="file" :accept="accept" :capture="capture" @change="handleUpload" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import uploadImg from '@/assets/sys/apply/upload.png'
import { ImagePreview, Loading } from 'vant'
export default {
    name: 'fcUpload',

    components: {
        Loading
    },
    props: {
        uploadList: {
            type: Array,
            default: () => []
        },
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
        value: {
            type: String | Number,
            default: ''
        },
        accept: {
            type: String,
            default: "image/*"
        },
        formKey: {
            type: String,
            default: ""
        },
        multiple: {
            type: Boolean,
            default: false
        },
        overlay: {
            type: String,
            defalt: ""
        },
        title: {
            type: String,
            default: ""
        },
        capture: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        uploadMode: {  // 上传方式 button | image
            type: String,
            default: "image"
        },
        max: {
            type: Number | String,
            default: ""
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isError: false,
            uploading: false,
            uploadImg
        }
    },

    computed: {
        getUploadList() {
            if (this.value) {
                return this.value
            }
            return this.uploadList
        }
    },

    methods: {

        /**
            点击预览图片
            @param { String } src 图片地址
            @return
        */
        previewImg(src) {
            ImagePreview([src])
        },

        /**
            处理删除上传的图片
            @param { Number } index 点击图片的下标
            @return
        */
        handleDeleteImg(index) {
            const uploadItem = { ...this.uploadList[index] }
            delete uploadItem.img
            this.$set(this.uploadList, index, uploadItem)
        },

        /**
            点击上传图片图标
            @param { String } id input的id
            @return
        */
        imgClick(id) {
            let elementId = document.getElementById(`${id}`)
            elementId.click();
        },

        /**
            input上传时触发
            @param { Event } event input change事件参数
            @return
        */
        handleUpload(event) {
            this.uploading = true
            this.isError = false
            let formData = new FormData()
            formData.append('file', event.target.files[0])
            event.srcElement.value = ""
            this.$axios({
                url: '/upload-file',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                baseUrl: "/api/base"
            }).then((res) => {
                this.uploading = false
                this.isError = false
                const imgList = [...this.value]
                imgList.push(res.data)
                this.$emit('change', imgList)
            }).catch(() => {
                this.uploading = false
                this.isError = false
            })
        },

        /**
            点击删除按钮时触发
            @param { Number } key 图片下标
            @return
        */
        handleDelete(key) {
            const imgList = [...this.value]
            imgList.splice(key, 1)
            this.$emit('change', imgList)
        },

        /**
            处理预览图片
            @param { Number } key 图片下标
            @return
        */
        handlePreviewImg(key) {
            ImagePreview({
                images: this.value,
                startPosition: key
            })
        },

        /**
            上传input框内容改变时触发
            @param { Event } event input change事件参数
            @param { Number } key 上传图片的下标
            @return
        */
        uploadChange(event, key) {
            let formData = new FormData()
            formData.append('file', event.target.files[0])
            event.srcElement.value = ""
            this.$set(this.uploadList[key], 'loading', true)
            this.$axios({
                url: '/upload-file',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                baseUrl: "/api/base"
            }).then((res) => {
                const uploadItem = { ...this.uploadList[key] }
                uploadItem.img = res.data
                uploadItem.loading = false
                this.$set(this.uploadList, key, uploadItem)
                this.$emit('change', this.uploadList)
            }).catch(() => {
                const uploadItem = { ...this.uploadList[key] }
                uploadItem.loading = false
                this.$set(this.uploadList, key, uploadItem)
            })
        }
    },

}

</script>

<style scoped lang='scss'>
.upload {
    width: 100%;
    padding-bottom: 0.3rem;
    transition: all 0.15s;
    padding-top: 0.3rem;
    border-bottom: 1px solid #eeeeee;
    .upload-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: auto;

        .formItem-label {
            padding-bottom: 0.3rem;
        }
        .formItem-upload-one {
            margin: 0;
        }
        .formItem-content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-left: 0;
            .formItem-content-item:nth-child(2n + 1) {
                margin-left: 0.08rem;
            }
        }
        .formItem-content > img {
            width: 0.64rem;
            height: 0.64rem;
            background-color: aquamarine;
        }

        .formItem-content-item {
            margin-left: 0.4rem;

            .formItem-uploader {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 3.16rem;
                height: 2.04rem;
                background-size: 100% 100%;
                // padding: 0.3rem 0.4rem;
                // margin: 0.1rem;
                // background: aliceblue;
                // border-radius: 4px;
                .formItem-uploader-camera {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .formItem-uploader-delete {
                    position: absolute;
                    right: -0.22rem;
                    top: -0.22rem;
                    width: 0.48rem;
                    height: 0.48rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    > img {
                        width: 0.36rem;
                        height: 0.36rem;
                    }
                }

                .completeWork-imageItem-uploading {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: #f1f6ff;
                    /deep/ .van-loading {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        .van-loading__spinner {
                            width: 0.48rem;
                            height: 0.48rem;
                        }
                        .van-loading__text {
                            margin-top: 0.1rem;
                            font-size: 0.24rem;
                        }
                    }
                }
            }
            .uploader-img {
                height: 100%;
                width: 100%;
            }

            .formItem-title {
                margin-top: 0.2rem;
                text-align: center;
                font-size: 0.28rem;
                color: #333333;
            }
        }
    }

    .formItem-multiple-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .formItem-multiple-list {
            margin-top: 0.3rem;
            display: flex;
            flex-direction: row;
        }
        .formItem-multiple-item {
            position: relative;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            width: 1.6rem;
            height: 1.6rem;
            padding: 0.1rem;
            border: 1px solid #e1e1e1;
            .formItem-multiple-item-img {
                width: 100%;
                height: 100%;
            }
            .formItem-multiple-item-delete {
                position: absolute;
                width: 0.44rem;
                height: 0.44rem;
                right: -0.22rem;
                top: -0.22rem;
                padding: 0.08rem;
                > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .formItem-multiple-upload {
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            border: 1px dashed #d9d9d9;
            img {
                position: absolute;
                width: 0.48rem;
                height: 0.38rem;
                left: 0;
                right: 0;
                top: 0.36rem;
                margin: 0 auto;
            }
            .formItem-multiple-title {
                z-index: 2;
                position: absolute;
                top: 0.9rem;
                left: 0.08rem;
                right: 0.08rem;
                text-align: center;
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #999999;
            }
            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                opacity: 0;
            }
        }

        .formItem-multiple-button-title {
            margin-top: -0.2rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #969799;
        }
        .formItem-multiple-button-upload {
            position: absolute;
            right: 0;
            top: 0.24rem;
            width: 1.72rem;
            height: 0.56rem;
            border-radius: 0.04rem;
            text-align: center;
            line-height: 0.56rem;
            span {
                font-size: 0.28rem;
            }
            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
    .formItem-multiple-button-content {
        flex-direction: column;
    }
    .formItem-uploading {
        z-index: 4;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #f1f6ff;
        /deep/ .van-loading {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .van-loading__spinner {
                width: 0.48rem;
                height: 0.48rem;
            }
            .van-loading__text {
                margin-top: 0.1rem;
                font-size: 0.24rem;
            }
        }
    }
}
</style>