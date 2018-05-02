<template>
        <div style="min-height: 800px" v-loading="loading">
            <el-card shadow="never">
                <div v-html="$markdown(text)"></div>
            </el-card>
        </div>
    </template>
    <script>
        import ProjectApi from '@/api/project'
        export default{
            data(){
                return {
                    loading:false,
                    text:""
                } 
            },
            mounted(){
                this.loading=true
                ProjectApi.getBlogReadme().then((response)=>{
                    let result = response.data
                    let base64 = require('js-base64').Base64
                    this.text=base64.decode(result.content)
                }).then(()=>this.loading=false)
            }
        }
    </script>
    
    <style>
      
    </style>