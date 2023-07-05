<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App'
}
</script>

<style>
#app {
    height: 100%;
}
.taeGreen-all {
    margin-top: 0.3rem;
    font-size: 0.26rem;
    text-align: center;
    color: #999;
}

.staff-qrcode {
    padding: 0.14rem 0 0rem;
}

.staff-qrcode > img {
    display: block;
    width: 3.36rem;
    height: 3.36rem;
    margin: 0 auto;
}

.taeGreenItem-qrcode-default {
    font-size: 0.26rem;
    color: #999;
}

.defaultPage {
    min-height: 100%;
    background-color: #f4f4f4;
}

.defaultPage > img {
    width: 100%;
}

.staff-qrcode > div {
    position: relative;
    bottom: -0.16rem;
    text-align: center;
    font-size: 0.28rem;
}
</style>
