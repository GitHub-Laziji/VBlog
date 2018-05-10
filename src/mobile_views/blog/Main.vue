<template>
    <div>
        <mt-header title="博客">
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <mt-cell
        v-for="(item,index) in blogs" 
        :key="'p'+index"
        :title="item.title"

        is-link
        :label="$util.cutStr(item.description,20)">
        </mt-cell>
          

        
            
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
            this.list()
        },
        methods:{
            list(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                })
                this.blogs=[]
                GistApi.list(this.query).then((response)=>{
                    let result = response.data
                    let pageNumber = this.$util.parseHeaders(response.headers)
                    if(pageNumber){
                        this.query.pageNumber = pageNumber
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
                }).then(()=>{
                    this.$indicator.close()
                    this.$toast({
                        message:'移动端开发中... 请在电脑上打开',
                        duration: 5000
                    })
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