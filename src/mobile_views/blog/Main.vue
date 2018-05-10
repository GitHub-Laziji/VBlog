<template>
    <div style="background: #F2F6FC;min-height: 1000px">
        <van-nav-bar
        style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -5px 10px #888888;width: 100%;"
        title="博客"/>
        <div style="height: 60px;"></div>
        <van-panel 
        @click="test"
        v-for="(item,index) in blogs" 
        style="margin-bottom: 5px"
        :key="'p'+index"
        :title="item.title"
        :desc="'更新时间 '+item.updateTime" >
            <div style="padding: 0px 12px 5px 12px;color: #606266;font-size: 0.9rem">{{item.description}}</div>
            <!-- <div slot="footer">
                  <van-button size="small">按钮</van-button>
                  <van-button size="small" type="danger">按钮</van-button>
            </div> -->
        </van-panel>
        <div style="height: 100px;"></div>
          

        
            
    </div>
</template>

<script>
    import GistApi from '@/api/gist'
    export default{
        data(){
            return {
                query:{
                    page:1,
                    pageSize:20,
                    pageNumber:1
                },
                searchKey:"",
                blogs:[]
            }
        },
        mounted(){
            this.$toast({
                message:'移动端开发中... 请在电脑上打开',
                duration: 5000
            })
            this.list()
        },
        methods:{
            test(){

            },
            list(){
                GistApi.list(this.query).then((response)=>{
                    let result = response.data
                    let pageNumber = this.$util.parseHeaders(response.headers)
                    if(pageNumber){
                        this.query.pageNumber = pageNumber
                    }
                    if(result.length==0){

                        return
                    }
                    for(let i = 0;i<result.length;i++){
                        for(let key in result[i].files){
                            let data={}
                            data['title']=key
                            data['url']=result[i].files[key]
                            data['description']=result[i]['description']
                            data['id']=result[i]['id']
                            data['createTime']=this.$util.utcToLocal(result[i]['created_at'])
                            data['updateTime']=this.$util.utcToLocal(result[i]['updated_at'])
                            data['hide']=false
                            this.blogs.push(data)
                            break
                        }
                    }
                    // this.query.page++
                })
            },
            search(){
                for(let i=0;i<this.blogs.length;i++){
                    this.blogs[i].hide=this.blogs[i].title.indexOf(this.searchKey)<0
                }
            },

        }
    }
</script>