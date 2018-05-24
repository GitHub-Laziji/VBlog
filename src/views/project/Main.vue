<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
            <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
            <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
        </el-card>

        <div v-if="projects&&projects.length>0">
            <el-card shadow="hover" v-for="(item,index) in projects" :key="'pro'+index" style="margin-bottom: 20px" v-if="!item.hide">
                <div slot="header">
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <a style="text-decoration:none;cursor:pointer" @click="goDetails(item.name)">
                                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{item.name}}
                                </a>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button @click="goGithub(item.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                                <el-button @click="$share('/user/project/details/'+item.name)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
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
                <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
                    <el-row>
                        <el-col :span="16" style="padding-top: 5px">
                            <el-tooltip effect="dark" :content="'star '+item.stargazersCount" placement="bottom">
                                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                            </el-tooltip>
                            {{item.stargazersCount}}
                            <el-tooltip effect="dark" :content="'watch '+item.watchersCount" placement="bottom">
                                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.watchersCount}}
                            <el-tooltip effect="dark" :content="'fork '+item.forksCount" placement="bottom">
                                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.forksCount}}
                        </el-col>
                        <el-col :span="8" style="text-align: right;">
                            <el-tag size="small" type="danger" v-if="item.license">{{item.license}}</el-tag>
                            <el-tag size="small" type="success">{{item.language}}</el-tag>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <div style="text-align: center">
                <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize"
                    :total="query.pageNumber*query.pageSize">
                </el-pagination>
            </div>
        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import ProjectApi from "@/api/project"
    export default {
        data() {
            return {
                query: {
                    page: 1,
                    pageSize: 5,
                    pageNumber: 1
                },
                loading: false,
                searchKey: "",
                projects: []
            }
        },
        computed: {
            ...mapGetters([
                'token',
            ])
        },
        mounted() {
            this.list()
        },
        methods: {
            list() {
                this.loading = true
                ProjectApi.list(this.query).then((response) => {
                    let result = response.data
                    let pageNumber = this.$util.parseHeaders(response.headers)
                    if (pageNumber) {
                        this.query.pageNumber = pageNumber
                    }
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i]
                        let data = {}
                        data.id = item['id']
                        data.name = item['name']
                        data.url = item['html_url']
                        data.description = item['description']
                        data.stargazersCount = item['stargazers_count']
                        data.watchersCount = item['watchers_count']
                        data.forksCount = item['forks_count']
                        data.language = item['language']
                        data.license = item['license'] ? item['license']['spdx_id'] : null
                        data.createTime = this.$util.utcToLocal(item['created_at'])
                        data.updateTime = this.$util.utcToLocal(item['updated_at'])
                        data.hide = false
                        this.projects.push(data)
                    }
                }).then(() => this.loading = false)
            },
            search() {
                for (let i = 0; i < this.projects.length; i++) {
                    this.projects[i].hide = this.projects[i].name.indexOf(this.searchKey) < 0
                }
            },
            goDetails(name) {
                this.$router.push("/user/project/details/" + name)
            },
            goGithub(url) {
                window.open(url)
            }
        }
    }
</script>