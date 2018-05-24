<template>
    <div>
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -5px 10px #888888;width: 100%;" :title="project.name"
            left-text="返回" right-text="分享" @click-left="$router.go(-1)" @click-right="$mobileShare()" left-arrow/>
        <div style="height: 60px;"></div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;padding: 10px">
            发布 {{project.createTime}}
            <br> 更新 {{project.updateTime}}
        </div>
        <div style="font-size: 1.0rem;line-height: 1.5;color: #303133;padding: 10px">
            {{project.description}}
        </div>
        <div style="padding: 0px 15px 5px 15px;color: #606266;border-bottom: 1px solid #E4E7ED;">
                <van-row>
                        <van-col span="12" style="font-size: 0.8rem;padding-top: 4px;color: #606266">
                            <van-icon name="like" />&nbsp;{{project.stargazersCount}}&emsp;
                            <van-icon name="coupon" />&nbsp;{{project.forksCount}}</van-col>
                        <van-col span="12" style="text-align: right">
                            <van-tag plain type="danger" v-if="project.license">{{project.license}}</van-tag>
                            <van-tag plain type="primary">{{project.language}}</van-tag>
                        </van-col>
                    </van-row>
        </div>
        <div v-html="project.content" class="markdown-body" style="padding: 10px"></div>
        <div style="height: 100px;"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ProjectApi from '@/api/project'
    export default {
        data() {
            return {
                project: {
                    name: "",
                    createTime: ""
                }
            }
        },

        mounted() {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '加载中'
            })
            this.project.name = this.$route.params.name
            ProjectApi.single(this.project.name).then((response) => {
                let result = response.data

                let base64 = require('js-base64').Base64
                this.project.id = result['id']
                this.project.url = result['html_url']
                this.project.stargazersCount = result['stargazers_count']
                this.project.watchersCount = result['watchers_count']
                this.project.forksCount = result['forks_count']
                this.project.language = result['language']
                this.project.description = result['description']
                this.project.license = result['license'] ? result['license']['spdx_id'] : null
                this.project.content = this.$markdown(base64.decode(result['readme_content']))
                this.project.createTime = this.$util.utcToLocal(result['created_at'])
                this.project.updateTime = this.$util.utcToLocal(result['updated_at'])
            }).then(() => this.$toast.clear())

        },
        methods: {

        }
    }
</script>