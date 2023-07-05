<template>
    <div class="itemCell">
        <div :style="`color: ${labelColor}`">{{ label }}</div>
        <div :style="`color: ${color}`">{{ text }}</div>
    </div>
</template>

<script>

export default {
    name: 'itemCell',

    components: {},
    props: {
        img: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
		color: {
			type: String,
			default: "#333333"
        },
        labelColor: {
            type: String,
			default: "#969799"
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
.itemCell {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.2rem;
    > img {
        position: relative;
        top: 0.06rem;
        display: block;
        width: 0.3rem;
        height: 0.3rem;
    }
    > div {
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #151515;
    }
}
.itemCell:last-child {
    margin-bottom: 0;
}
</style>