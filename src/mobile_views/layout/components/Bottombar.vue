<template>
    <div>
        <mt-tabbar v-model="active" @click="">
            <mt-tab-item 
            v-for="item in constantRouterMap"
            v-if="item.meta&&item.meta.type=='mobile'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini)"
            :id="item.path"
            :key="item.path">
                <img slot="icon" src="">
                {{item.meta.title}}
            </mt-tab-item>
            
        </mt-tabbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { constantRouterMap } from '@/router'
    export default{
        data(){
            return{
                constantRouterMap,
                active:"/mobile/user/blog",
            }
        },
        computed: {
            ...mapGetters([
                'token',
                'githubUsername',
                'mini'
            ])
        },
        watch:{
            'active':function(){
                this.$router.push(this.active)
            }
        },
        methods:{
            onSelect(){
                this.$router.push(this.active)
            }
        }
    }
</script>