<template>
    <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;" title="开源项目" right-text="分享"
            @click-right="$mobileShare()" />
        <div style="height: 60px;"></div>
        <router-link :to="`/mobile/user/project/details/${item.name}`" v-for="(item,index) in projects" :key="'p'+index" style=" text-decoration:none;cursor:pointer">
            <van-panel style="margin-bottom: 10px" :title="item.name" :desc="'更新时间 '+item.updateTime">
                <div style="padding: 7px 15px 7px 15px;color: #303133;font-size: 0.9rem">{{item.description}}</div>
                <div style="padding: 0px 15px 5px 15px;color: #303133;">
                    <van-row>
                        <van-col span="12" style="font-size: 0.8rem;padding-top: 4px;color: #606266">
                            <van-icon name="like" />&nbsp;{{item.stargazersCount}}&emsp;
                            <van-icon name="coupon" />&nbsp;{{item.forksCount}}</van-col>
                        <van-col span="12" style="text-align: right">
                            <van-tag plain type="danger" v-if="item.license">{{item.license}}</van-tag>
                            <van-tag plain type="primary">{{item.language}}</van-tag>
                        </van-col>
                    </van-row>
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
                windowSize: this.$util.getWindowSize(),
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
                        data.license = item['license'] ? item['license']['spdx_id'] : null
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