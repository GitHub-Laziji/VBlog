<template>
    <div style="min-height: 1000px" v-loading="loading">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px" ></el-input>
            <el-button icon="el-icon-search" circle plain style="margin-left: 10px"></el-button>
            <el-button icon="el-icon-share" type="warning" plain circle style="margin-left: 10px"></el-button>
            <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="$router.push('/user/blog/edit')">写博文</el-button>
        </el-card>
        
        <el-card shadow="hover" v-for="(item,index) in blogs" :key="'p'+index" style="margin-bottom: 20px">
            <div slot="header" >
                <span>
                    <a 
                    style="text-decoration:none;cursor:pointer" 
                    @click="goDetails(item.id)">
                        <i class="el-icon-tickets"></i>&nbsp;&nbsp;
                        {{item.title}}
                    </a>
                </span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-share"></el-button>
            </div>
            {{item.description}}
        </el-card>
           
    </div>
</template>
<script>
    import GistApi from '@/api/gist'
    export default{
        data(){
            return {
                loading:false,
                searchKey:"",
                blogs:[]
            }
        },
        mounted(){
            this.loading=true
            GistApi.list().then((result)=>{
                for(let i = 0;i<result.length;i++){
                    for(let key in result[i].files){
                        let data={}
                        data['title']=key
                        data['url']=result[i].files[key]
                        data['description']=result[i]['description']
                        data['id']=result[i]['id']
                        // console.log(data)
                        this.blogs.push(data)
                    }
                }
            }).then(()=>this.loading=false)
        },
        methods:{
            goDetails(id){
                this.$router.push("/user/blog/details/"+id)
            }
        }
    }
</script>
