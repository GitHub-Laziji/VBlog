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
        watch: {
            // configuration.json 是异步拉回来的：created 时 htmlTitle 还是空串，
            // 首屏标签页标题就变成空白。等配置到位再补一次标题。
            htmlTitle() {
                this.$setTitle(this.$route.meta.title)
            }
        },
        created() {
            // 配置是异步的，先等 configuration.json 回来再请求用户信息，
            // 否则 githubUsername 还是空串，请求会打到 /users/ 上。
            this.$store.dispatch("Init").then(() => this.$store.dispatch("GetInfo"))
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