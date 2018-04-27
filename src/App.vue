<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'App',
        computed: {
            ...mapGetters([
                'githubUsername',
                'htmlTitle'
            ])
        },
        created(){
            this.$store.dispatch("Init")
            this.$setTitle(this.$route.meta.title)
        }
    }
</script>

