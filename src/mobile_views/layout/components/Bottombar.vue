<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item v-for="item in constantRouterMap" v-if="item.meta&&item.meta.type=='mobile'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini)"
                :key="item.path" :to="item.path" :icon="item.meta.icon">
                {{item.meta.title}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { constantRouterMap } from '@/router'
    export default {
        data() {
            return {
                constantRouterMap,
                active: 0,
            }
        },
        computed: {
            ...mapGetters([
                'token',
                'githubUsername',
                'mini'
            ])
        },
        watch: {
            'active': function () {
                this.$router.push(this.active)
            }
        },
        methods: {
            onSelect() {
                this.$router.push(this.active)
            }
        }
    }
</script>