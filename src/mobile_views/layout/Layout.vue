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