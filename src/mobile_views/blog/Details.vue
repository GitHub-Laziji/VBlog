<template>
    <div>
        <van-nav-bar style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -5px 10px #888888;width: 100%;" :title="blog.title"
            left-text="返回" right-text="分享" @click-left="$router.go(-1)" @click-right="$mobileShare()" left-arrow/>
        <div style="height: 60px;"></div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;padding: 10px 10px 0px 10px">
            发布 {{blog.createTime}}
            <br> 更新 {{blog.updateTime}}
        </div>
        <div style="font-size: 1.0rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 0px 10px">
            <pre style="font-family: '微软雅黑'">{{blog.description}}</pre>
        </div>
        <div v-html="blog.content" class="markdown-body" style="padding: 10px"></div>
        <div style="height: 100px;"></div>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex'
    import GistApi from '@/api/gist'
    export default {
        data() {
            return {
                blog: {
                    id: "",
                    title: "",
                    content: "",
                    description: ""
                }
            }

        },
        mounted() {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '加载中'
            })
            this.blog.id = this.$route.params.id
            GistApi.single(this.blog.id).then((response) => {
                let result = response.data
                for (let key in result.files) {
                    this.blog['title'] = key
                    this.blog['content'] = this.$markdown(result.files[key]['content'])
                    this.blog['description'] = result['description']
                    this.blog['createTime'] = this.$util.utcToLocal(result['created_at'])
                    this.blog['updateTime'] = this.$util.utcToLocal(result['updated_at'])
                    break
                }
            }).then(() => this.$toast.clear())
        },
        methods: {
            
        }

    }
</script>