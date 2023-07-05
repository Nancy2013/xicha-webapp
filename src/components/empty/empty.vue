<template>
    <div class="empty">
        <img src="@/assets/common/default.png" alt="">
        <span>暂无数据</span>
    </div>
</template>

<script>

export default {
    name: 'empty',

    components: {},

    data() {
        return {}
    },

    mounted() { },

    methods: {},

}

</script>

<style scoped lang='scss'>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
        display: block;
        margin: 0.6rem auto 0;
        width: 4rem;
        height: 4rem;
    }
    > span {
        margin-top: .24rem;
        font-size: .32rem;
        color: #333333;
        font-weight: 400;
    }
}
</style>