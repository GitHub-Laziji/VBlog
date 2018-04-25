<template>
    <div>
        <el-button @click="tt" >aaa</el-button>
    </div>
</template>
<script>

    export default{
        data(){
            return{

            }
        },
        mounted(){
            
        },
        methods:{
            tt(){
                this.$util.fullScreen()
            }
        }
    }
</script>