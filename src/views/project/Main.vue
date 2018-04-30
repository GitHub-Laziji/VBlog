<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px" ></el-input>
            <el-button 
            @click="search"
            icon="el-icon-search" 
            style="margin-left: 10px"
            circle 
            plain></el-button>
            <el-button icon="el-icon-share" type="warning" plain circle style="margin-left: 10px"></el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="goAdd">写博文</el-button> -->
        </el-card>
        
        <div v-if="projects&&projects.length>0">
            <el-card shadow="hover" v-for="(item,index) in projects" :key="'pro'+index" style="margin-bottom: 20px" v-if="!item.hide">
                <div slot="header" >
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <a 
                                style="text-decoration:none;cursor:pointer" 
                                @click="goDetails(item.name)">
                                    <i class="el-icon-service"></i>&nbsp;&nbsp;
                                    {{item.name}}
                                </a>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    最近更新 {{item.updateTime}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    {{item.description}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    <el-tag size="small" type="success">{{item.language}}</el-tag>
                    <el-tooltip effect="dark" content="star" placement="bottom">
                        <i class="el-icon-star-off" style="margin: 0px 5px 0px 15px"></i>
                    </el-tooltip>
                    {{item.stargazersCount}}
                    <el-tooltip effect="dark" content="watch" placement="bottom">
                        <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                    </el-tooltip>
                    {{item.watchersCount}}
                    <el-tooltip effect="dark" content="fork" placement="bottom">
                        <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                    </el-tooltip>   
                    {{item.forksCount}}
                </div>
            </el-card>
        </div>
        
        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0"> 
            <font style="font-size: 30px;color:#dddddd "><b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b></font>
        </el-card>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import ProjectApi from "@/api/project"
    export default{
        data(){
            return {
                loading:false,
                searchKey:"",
                projects:[]
            }
        },
        computed: {
            ...mapGetters([
                'token',
            ])
        },
        mounted(){
            this.loading=true
            ProjectApi.list().then((result)=>{
                for(let i=0;i<result.length;i++){
                    let item = result[i]
                    let data={}
                    data.id = item['id']
                    data.name = item['name']
                    data.url = item['html_url']
                    data.description = item['description']
                    data.stargazersCount = item['stargazers_count']
                    data.watchersCount = item['watchers_count']
                    data.forksCount = item['forks_count']
                    data.language = item['language']
                    data.createTime = this.$util.utcToLocal(item['created_at'])
                    data.updateTime = this.$util.utcToLocal(item['updated_at'])
                    
                    data.hide = false
                    this.projects.push(data)
                }
                
            }).then(()=>this.loading=false)
        },
        methods:{
            search(){
                for(let i=0;i<this.projects.length;i++){
                    this.projects[i].hide=this.projects[i].name.indexOf(this.searchKey)<0
                }
            },
            goDetails(name){
                this.$router.push("/user/project/details/"+name)
            }
        }
    }
</script>