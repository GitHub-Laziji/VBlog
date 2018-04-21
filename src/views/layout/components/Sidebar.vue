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
    </div>
</template>

<script>
    import { constantRouterMap } from '@/router'
    export default{
        data(){
            return {
                constantRouterMap,
                active:"",
                parentUrl:"",
                menuList:[]
            }
        },
        mounted(){
            // console.log(this.$route.path.split("/")[2])
            let arr=this.$route.path.split("/")
            this.active="/"+arr[1]+"/"+arr[2]
        },
        methods:{
            onSelect(index){
                this.$router.push(index)
            }
        }
    }
</script>