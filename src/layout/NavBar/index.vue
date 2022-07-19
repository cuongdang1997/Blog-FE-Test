<template>
    <div id="navBar">
        <div class="navBar-left">
            <Cola class="left-item ishover" />
            <breadcrumb class="left-item" />
        </div>
        <div class="navBar-right">
            <error-log class="right-item ishover" />
            <screenfull class="right-item ishover" />
            <user-select class="right-item ishover" />
        </div>
    </div>
</template>
<script>
import Cola from '@/components/Base/Cola'
import Breadcrumb from '@/components/Base/Breadcrumb'
import ErrorLog from '@/components/Base/ErrorLog'
import Screenfull from './Screenfull'
import UserSelect from './UserSelect'
export default {
    components: {
        Cola,
        Breadcrumb,
        ErrorLog,
        Screenfull,
        UserSelect
    }
}
</script>
<style lang='stylus' scoped>
#navBar {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
    .navBar-left {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .navBar-right {
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 30px;
    }
    .left-item, .right-item {
        flex-center();
        height: 100%;
        font-size: 18px;
        padding: 0 10px;
        cursor: pointer;
        >>> .item-container {
            flex-center();
            height: 100%;
        }
    }
}
</style>
