<template>
    <div class="statistics">
        <div class="statistics-item" v-for="(renderItem, renderKey) in renderList" :key="renderKey">
            <div class="statistics-item-value color">{{ data[renderItem.key] }} {{ renderItem.unit }}</div>
            <div class="statistics-item-label">{{ renderItem.label }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'statistics',

    components: {},
    props: {
        renderList: {
            type: Array,
            default: () => []
        },
        data: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {}
    },

    mounted() { },

    methods: {},

}

</script>

<style scoped lang='scss'>
.statistics {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 2.06rem;
    padding: 0.3rem;
    background-color: #fff;
    .statistics-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 2.72rem;
        background-image: url(~@/assets/staff/home/teaGreen/teaGreen/left-bg.png);
        background-size: 100% 100%;
        .statistics-item-value {
            font-size: 0.36rem;
            line-height: 0.5rem;
        }
        .statistics-item-label {
            margin-top: 0.12rem;
            font-size: 0.26rem;
            line-height: 0.36rem;
            color: #151515;
        }
    }
    .statistics-item:nth-child(2) {
        background-image: url(~@/assets/staff/home/teaGreen/teaGreen/right-bg.png);
        .statistics-item-value {
            color: #a9ae44;
        }
    }
}
</style>