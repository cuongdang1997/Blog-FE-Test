<template>
    <div id="dashboard">
        <app-banner />
        <app-card />
    </div>
</template>
<script>
import appBanner from './components/banner'
import appCard from './components/card'
export default {
    name: 'home',
    components: {
        appBanner,
        appCard
    }
}
</script>
<style lang='stylus' scoped>
#dashboard {
    padding-top: 10px;
    padding-bottom: 20px;
    padding-right: 30px;
    background-color: #fff;
}
</style>
