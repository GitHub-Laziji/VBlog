<template>
    <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;" title="博客列表" right-text="分享"
            @click-right="$mobileShare()" />
        <div style="height: 60px;"></div>
        <router-link :to="`/mobile/user/blog/details/${item.id}`" v-for="(item,index) in blogs" :key="'p'+index">
            <van-panel style="margin-bottom: 10px" :title="item.title" :desc="'更新时间 '+item.updateTime">
                <div style="padding: 7px 15px 7px 15px;color: #303133;font-size: 0.9rem">{{$util.cutStr(item.description,50)}}</div>
            </van-panel>
        </router-link>
        <div style="height: 100px;"></div>

    </div>
</template>

<script>
    import GistApi from '@/api/gist'
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
                blogs: []
            }
        },
        mounted() {

            this.list()
        },
        methods: {
            test() {

            },
            list() {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: '加载中'
                })
                GistApi.list(this.query).then((response) => {
                    let result = response.data
                    let pageNumber = this.$util.parseHeaders(response.headers)
                    if (pageNumber) {
                        this.query.pageNumber = pageNumber
                    }
                    if (result.length == 0) {

                        return
                    }
                    for (let i = 0; i < result.length; i++) {
                        for (let key in result[i].files) {
                            let data = {}
                            data['title'] = key
                            data['url'] = result[i].files[key]
                            data['description'] = result[i]['description']
                            data['id'] = result[i]['id']
                            data['createTime'] = this.$util.utcToLocal(result[i]['created_at'])
                            data['updateTime'] = this.$util.utcToLocal(result[i]['updated_at'])
                            data['hide'] = false
                            this.blogs.push(data)
                            break
                        }
                    }
                    // this.query.page++
                }).then(() => this.$toast.clear())
            },
            search() {
                for (let i = 0; i < this.blogs.length; i++) {
                    this.blogs[i].hide = this.blogs[i].title.indexOf(this.searchKey) < 0
                }
            },
            goDetails(id) {
                console.log(id)
                this.$router.push("" + id)
            }
        }
    }
</script>