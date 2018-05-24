<template>
    <div>
        <app-main></app-main>
        <bottombar style="position:fixed;bottom:0;"></bottombar>
    </div>
</template>

<script>
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