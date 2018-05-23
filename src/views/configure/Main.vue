<template>
    <div style="min-height: 800px" v-loading="loading">
        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
            <el-form :model="configure" :rules="rules" ref="configureForm" label-width="100px">
                <el-tabs v-model="activeTab" type="card">
                    <el-tab-pane label="基础配置" name="base" style="padding: 5px">

                        <el-form-item label="用户名" prop="githubUsername">
                            <el-input v-model="configure.githubUsername" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="博客标题" prop="blogTitle">
                            <el-input v-model="configure.blogTitle" :placeholder="configure.githubUsername"></el-input>
                        </el-form-item>
                        <el-form-item label="博客描述" prop="blogDescribe">
                            <el-input v-model="configure.blogDescribe" :placeholder="'欢迎来到'+configure.githubUsername+'的个人博客。'"></el-input>
                        </el-form-item>
                        <el-form-item label="页面标题" prop="htmlTitle">
                            <el-input v-model="configure.htmlTitle" :placeholder="configure.githubUsername+'的博客'"></el-input>
                        </el-form-item>
                        <el-form-item label="音乐链接" prop="audioUrl">
                            <el-input v-model="configure.audioUrl" placeholder="背景音乐链接"></el-input>
                        </el-form-item>
                        <el-form-item label="自动播放">
                            <el-switch v-model="configure.audioAutoPlay"></el-switch>
                        </el-form-item>
                        <el-form-item label="极简模式">
                            <el-switch v-model="configure.mini"></el-switch>
                        </el-form-item>
                        <el-form-item label="使用背景图">
                            <el-switch v-model="configure.useBackgroundImage"></el-switch>
                        </el-form-item>
                        <el-form-item label="文字颜色">
                            <el-color-picker v-model="configure.fontColor"></el-color-picker>
                        </el-form-item>
                        <div v-if="!configure.useBackgroundImage">
                            <el-row>
                                <el-col :span="3">
                                    <el-form-item label="背景颜色">
                                        <el-color-picker :predefine="predefineColors" v-model="configure.backgroundColorLeft"></el-color-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="21">
                                    <el-form-item>
                                        <el-color-picker :predefine="predefineColors" v-model="configure.backgroundColorRight"></el-color-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="效果" prop="htmlTitle">
                                <div :style="'background-image: linear-gradient(120deg, '+configure.backgroundColorLeft+', '+configure.backgroundColorRight+');border-radius: 5px;border: 1px solid #F2F6FC;width:300px;height:100px;'">
                                    <div :style="'color: '+configure.fontColor+';text-align: center;padding-top:25px;font-size:35px'">
                                        <b>标题</b>
                                    </div>
                                </div>
                            </el-form-item>
                        </div>
                        <div v-if="configure.useBackgroundImage">
                            <el-form-item label="背景图片">
                                <el-upload action="" :auto-upload="false" drag>
                                    <i class="el-icon-upload"></i>
                                    <div>将文件拖到此处&nbsp;(暂不支持上传图片)</div>
                                </el-upload>
                            </el-form-item>
                        </div>


                    </el-tab-pane>
                    <el-tab-pane label="扩展配置" name="extend" style="padding: 5px">
                        <el-form-item label="其他网站">
                            <el-row v-for="(item,index) in configure.webSites" :key="'webSites'+index" style="margin-bottom: 10px">
                                <el-col :span="8" style="padding-right: 10px">
                                    <el-input v-model="configure.webSites[index].name" placeholder="网站名字 例如: V2EX"></el-input>
                                </el-col>
                                <el-col :span="14" style="padding-right: 10px">
                                    <el-input v-model="item.url" placeholder="完整URL 例如: https://..."></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-button @click="removeWebSites(index)"  style="float: right;" icon="el-icon-delete" type="danger" circle></el-button>
                                </el-col>
                            </el-row>
                            <el-button @click="addWebSites" style="float: right;" icon="el-icon-plus"  type="success" circle></el-button>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item>
                    <el-button @click="submit" :loading="submitButton.loading" :disabled="submitButton.disabled" type="primary">修改配置</el-button>
                    <el-button @click="reset">还原</el-button>
                    <el-popover placement="top-end" width="200" trigger="click" content="打开极简模式将隐藏部分不主要的菜单, 音乐链接需要是媒体 (不可以是HTML页面)">
                        <el-button slot="reference" icon="el-icon-question" type="text" style="float: right;">说明</el-button>
                    </el-popover>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import ProjectApi from '@/api/project'
    export default {
        data() {
            return {
                activeTab: "base",
                loading: false,
                configureSha: null,
                configure: {
                    webSites: []
                },
                initConfigure: {},
                rules: {
                    githubUsername: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    blogTitle: [
                        // { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    blogTitle: [
                        // { required: true, message: '请输入用户名', trigger: 'blur' },
                    ]
                },
                submitButton: {
                    loading: false,
                    disabled: false
                },
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#CCFC2D',
                    '#90ee90',
                    '#2DFCA6',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    '#FC2DEB'
                ]
            }
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        mounted() {
            if (!this.token) {
                this.$nextTick(() => {
                    this.$message({
                        message: '权限不足',
                        type: 'error'
                    })
                    this.$router.go(-1)
                })
                return
            }
            this.loading = true
            ProjectApi.getBlogConfigure().then((response) => {
                let result = response.data
                let base64 = require('js-base64').Base64
                let text = base64.decode(result.content)
                this.configure = JSON.parse(text)
                if (!this.configure.webSites) {
                    this.$set(this.configure, "webSites", [])
                }
                this.initConfigure = JSON.parse(JSON.stringify(this.configure))
                this.configureSha = result.sha
            }).then(() => this.loading = false)
        },
        methods: {
            submit() {
                this.$refs['configureForm'].validate((valid) => {
                    if (valid) {
                        this.submitButton.loading = true
                        this.submitButton.disabled = true
                        ProjectApi.editBlogConfigure(this.configure, this.configureSha).then((response) => {
                            let result = response.data
                            this.configureSha = result.content.sha
                            this.initConfigure = JSON.parse(JSON.stringify(this.configure))
                            this.$store.dispatch("LocalReload", this.configure)
                            this.$notify({
                                title: '成功',
                                message: '修改配置成功',
                                type: 'success'
                            })
                            // this.$message({
                            //     message: '修改成功',
                            //     type: 'success'
                            // })
                        }).then(() => {
                            this.submitButton.loading = false
                            this.submitButton.disabled = false
                        })
                    }
                })
            },
            reset() {
                this.configure = JSON.parse(JSON.stringify(this.initConfigure))
            },
            addWebSites() {
                if (this.configure.webSites.length >= 5) {
                    this.$message("站点太多显示效果不好")
                    return
                }
                this.configure.webSites.push({})

            },
            removeWebSites(index) {
                this.configure.webSites.splice(index,1)
            }
        }
    }
</script>