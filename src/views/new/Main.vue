<template>
    <div>
        <el-card shadow="never" style="min-height: 600px">
            <div slot="header">
                <span>{{blog.title}}</span>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{blog.createTime}}<br>
                更新 {{blog.updateTime}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 20px 0px 25px 0px">
                {{blog.description}}
            </div>
            <div v-html="blog.content"></div>
        </el-card>
    </div>
</template>
<script>
    import GistApi from '@/api/gist'
    export default{
        data(){
            return {
                loading:false,
                blog:{
                    id:"",
                    title:"",
                    content:"",
                    description:"",
                    createTime:"",
                    updateTime:""
                }
            }
        },
        mounted(){
            this.loading=true
            GistApi.list().then((result)=>{
                if(!result||result.length==0){
                    return
                }
                for(let key in result[0].files){
                    this.blog.id=result[0]['id']
                    break
                }
                GistApi.single(this.blog.id).then((result)=>{
                    for(let key in result.files){
                        this.blog['title']=key
                        this.blog['content']=this.$markdown(result.files[key]['content'])
                        this.blog['description']=result['description']
                        this.blog['createTime']=this.$util.utcToLocal(result['created_at'])
                        this.blog['updateTime']=this.$util.utcToLocal(result['updated_at'])
                        break
                    }
                }).then(()=>this.loading=false)
            })
        },
    }
</script>