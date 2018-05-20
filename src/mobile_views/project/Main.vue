<template>
    <div style="background: #F2F6FC;min-height: 700px">
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;" title="开源项目" right-text="分享"
            @click-right="$mobileShare()" />
        <div style="height: 60px;"></div>
        <router-link :to="`/mobile/user/project/details/${item.name}`" v-for="(item,index) in projects" :key="'p'+index" style=" text-decoration:none;cursor:pointer">
            <van-panel style="margin-bottom: 5px" :title="item.name" :desc="'更新时间 '+item.updateTime">
                <div style="padding: 0px 15px 5px 15px;color: #606266;font-size: 0.9rem">{{item.description}}</div>
                <div style="padding: 0px 15px 5px 15px;color: #606266;">
                    <van-icon name="points" />&nbsp;{{item.stargazersCount}}&emsp;
                    <van-icon name="exchange" />&nbsp;{{item.forksCount}}
                    <van-tag mark type="primary" style="float: right;">{{item.language}}</van-tag>
                </div>
            </van-panel>
        </router-link>
        <div style="height: 100px;"></div>

    </div>
</template>

<script>
    import ProjectApi from "@/api/project"
    export default {
        data() {
            return {
                query: {
                    page: 1,
                    pageSize: 20,
                    pageNumber: 1
                },
                searchKey: "",
                projects: []
            }
        },
        mounted() {
            this.list()
        },
        methods: {
            list() {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: '加载中'
                })
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
                        data.createTime = this.$util.utcToLocal(item['created_at'])
                        data.updateTime = this.$util.utcToLocal(item['updated_at'])
                        data.hide = false
                        this.projects.push(data)
                    }
                }).then(() => this.$toast.clear())
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