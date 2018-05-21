<template>
    <div style="min-height: 600px" v-loading="loading">
        <el-card shadow="never" style="min-height: 400px">
            <div slot="header">
                <el-row>
                    <el-col :span="12">
                        <span>{{blog.title}}</span>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right;">
                            <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
                            <el-button @click="edit" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token">编辑</el-button>
                            <el-button style=" padding: 3px 0" type="text" icon="el-icon-more-outline" @click="more">更多博客</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{blog.createTime}}
                <br> 更新 {{blog.updateTime}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
                <pre style="font-family: '微软雅黑'">{{blog.description}}</pre>
            </div>
            <div v-html="blog.content" class="markdown-body" style="padding-top: 20px"></div>
        </el-card>
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
                },
                loading: false,
            }
        },
        computed: {
            ...mapGetters([
                'token',
            ])
        },
        mounted() {
            this.loading = true
            this.blog.id = this.$route.params.id
            // console.log(this.$route.params.id)
            GistApi.single(this.blog.id).then((response) => {
                let result = response.data
                for (let key in result.files) {
                    this.blog['title'] = key
                    this.blog['content'] = this.$markdown(result.files[key]['content'])
                    this.blog['description'] = result['description']
                    this.blog['createTime'] = this.$util.utcToLocal(result['created_at'])
                    this.blog['updateTime'] = this.$util.utcToLocal(result['updated_at'])
                    // console.log(JSON.stringify(this.blog))
                    break
                }
            }).then(() => this.loading = false)


        },
        methods: {
            edit() {
                if (!this.token) {
                    this.$message({
                        message: '请绑定有效的Token',
                        type: 'warning'
                    })
                    return
                }
                this.$router.push('/user/blog/edit/' + this.blog.id)
            },
            more() {
                this.$router.push('/user/blog/main')
            }
        }
    }
</script>