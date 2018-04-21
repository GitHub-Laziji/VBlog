<template>
    <div>
        <div style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px" ></el-input>
            <el-button icon="el-icon-search" circle plain style="margin-left: 10px"></el-button>
            <el-button icon="el-icon-share" type="warning" plain circle style="margin-left: 10px"></el-button>
            <el-button type="primary" icon="el-icon-edit" round plain style="float: right;">写博文</el-button>
        </div>
        
        <el-card shadow="hover" v-for="(item,index) in blogs" :key="'p'+index" style="margin-bottom: 20px">
            <div slot="header" >
                <span><i class="el-icon-tickets"></i>&nbsp;&nbsp;{{item.title}}</span>
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
                searchKey:"",
                blogs:[]
            }
        },
        mounted(){
            GistApi.list().then((result)=>{
                for(let i = 0;i<result.length;i++){
                    for(let key in result[i].files){
                        let data={}
                        data['title']=key
                        data['url']=result[i].files[key]
                        data['description']=result[i]['description']
                        // console.log(data)
                        this.blogs.push(data)
                    }
                }
            })
        }
    }
</script>
