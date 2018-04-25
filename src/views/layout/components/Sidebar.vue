<template>
    <div>
        <el-card shadow="never">
            <el-menu
            :default-active="active"
            @select="onSelect">
                <el-menu-item 
                v-for="item in constantRouterMap"
                v-if="item.meta&&item.meta.type=='user'"
                :key="item.path"
                :index="item.path">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-card>
        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                <el-tag type="warning" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
                Token未绑定&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">绑定</el-button>
            </div>
            <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
                Token已绑定&nbsp;&nbsp;
                <el-button type="text" @click="cancellation">注销</el-button>
            </div>
        </el-card>
        <token-dialog ref="tokenDialog"></token-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { constantRouterMap } from '@/router'
    import TokenDialog from '@/views/common/TokenDialog'
    export default{
        components: {
            TokenDialog
        },
        data(){
            return {
                constantRouterMap,
                active:"",
                parentUrl:"",
                menuList:[]
            }
        },
        computed: {
            ...mapGetters([
                'token',
                'githubUsername'
            ])
        },
        mounted(){
            // console.log(this.$route.path.split("/")[2])
            let arr=this.$route.path.split("/")
            this.active="/"+arr[1]+"/"+arr[2]
        },
        methods:{
            onSelect(index){
                this.$router.push(index)
            },
            openTokenDialog(){
                this.$refs.tokenDialog.open(()=>{
                    console.log("aaa")
                })
            },
            cancellation(){
                this.$store.dispatch("Cancellation")
            }
        }
    }
</script>