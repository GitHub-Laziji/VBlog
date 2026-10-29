<template>
    <div>
        <app-main></app-main>
        <bottombar style="position:fixed;bottom:0;"></bottombar>
    </div>
</template>

<script>
    // 移动端 UI 库挂在 Layout 上懒加载，桌面端路由不会再拉 vant
    import '../../plugins/vant'
    import { mapGetters } from 'vuex'
    import Bottombar from './components/Bottombar'
    import AppMain from './components/AppMain'
    export default {
        components: {
            Bottombar,
            AppMain
        },
    }
</script>

<style>
.mobile-border{
    border-top:1px solid #E4E7ED;
    border-bottom:1px solid #E4E7ED;
}
.mobile-border-top{
    border-top:1px solid #E4E7ED;
}
.mobile-margin-top{
    margin-top: 10px;
}
</style>