<template>
    <div class="sideItem">
        <template v-for="(list, listIndex) in json">
            <el-submenu v-if="list.children && list.children.length > 0" :index="list.name + listIndex" :key="listIndex">
                <template #title>
                    <side-value :icon="routeIcon(list)" :title="routeName(list)"></side-value>
                </template>
                <template v-for="(item, itemIndex) in list.children">
                    <side-item v-if="item.children && item.children.length > 0" :json="[item]" :key="itemIndex"></side-item>
                    <side-link v-else :to="item" :key="itemIndex">
                        <el-menu-item :index="item.name">
                            <side-value :icon="routeIcon(item)" :title="routeName(item)"></side-value>
                        </el-menu-item>
                    </side-link>
                </template>
            </el-submenu>
            <side-link v-else :to="list" :key="listIndex">
                <el-menu-item :index="list.name">
                    <side-value :icon="routeIcon(list)" :title="routeName(list)"></side-value>
                </el-menu-item>
            </side-link>
        </template>
    </div>
</template>
<script>
import sideLink from './sideLink'
import sideValue from './sideValue'
import { translationRouteTitle } from '@/utils/i18n'
export default {
    name: 'sideItem',
    components: { sideLink, sideValue },
    props: {
        json: Array
    },
    methods: {
        translationRouteTitle,
        routeIcon(route) {
            if (route.meta && route.meta.icon) {
                return route.meta.icon
            } else {
                return ''
            }
        },
        routeName(route) {
            if (route.meta && route.meta.title) {
                return this.translationRouteTitle(route.meta.title)
            } else {
                return this.translationRouteTitle(route.name)
            }
        }
    }
}
</script>
<style lang='stylus' scoped>
.sideItem {
    a {
        display: block;
    }
}
</style>
