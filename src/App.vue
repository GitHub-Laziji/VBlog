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
        created() {
            this.$store.dispatch("Init")
            this.$store.dispatch("GetInfo")
            this.$setTitle(this.$route.meta.title)
            let windowSize = this.$util.getWindowSize()
            let pathArr = this.$route.path.split("/")
            if (pathArr[1] == "user" && windowSize.height > windowSize.width * 1.2) {
                this.$router.push("/mobile/user/blog")
            }
            if (pathArr[1] == "mobile" && windowSize.height <= windowSize.width * 1.2) {
                this.$router.push("/")
            }
        }
    }
</script>